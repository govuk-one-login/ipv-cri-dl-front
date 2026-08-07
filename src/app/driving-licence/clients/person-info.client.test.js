const { personInfoClient } = require("./person-info.client");
const LOGGER = require("../../../utils/logger");

const PII_VALUES = [
  "KENNETH",
  "DECERQUEIRA",
  "1965-07-08",
  "BA2 5AA",
  "DOE99751010AL9OD",
  "2022-02-02",
  "2012-02-02",
  "scared of the dark"
];

const VALID_RESPONSE = {
  name: [
    {
      nameParts: [
        { type: "GivenName", value: "KENNETH" },
        { type: "FamilyName", value: "DECERQUEIRA" }
      ]
    }
  ],
  birthDate: [{ value: "1965-07-08" }],
  address: [{ postalCode: "BA2 5AA" }],
  drivingPermit: [
    {
      personalNumber: "DOE99751010AL9OD",
      expiryDate: "2022-02-02",
      issueNumber: "13",
      issuedBy: "DVLA",
      issueDate: "2012-02-02"
    }
  ]
};

const mockResponse = ({ status = 200, body }) => ({
  status,
  json: async () => body
});

describe("personInfoClient", () => {
  let req;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    req.session.tokenId = "session-token";
  });

  afterEach(() => sandbox.restore());

  it("calls customFetch with the person-info path and session_id header", async () => {
    req.customFetch = sandbox
      .stub()
      .resolves(mockResponse({ body: VALID_RESPONSE }));

    await personInfoClient(req).get();

    expect(req.customFetch).to.have.been.calledOnceWithExactly("/person-info", {
      method: "GET",
      headers: { session_id: "session-token" },
      timeoutMs: 30_000
    });
  });

  it("returns authSource:true with parsed data on a valid 200", async () => {
    req.customFetch = sandbox
      .stub()
      .resolves(mockResponse({ body: VALID_RESPONSE }));

    const result = await personInfoClient(req).get();

    expect(result).to.deep.equal({ authSource: true, data: VALID_RESPONSE });
  });

  it("returns authSource:false on 204 without reading the body", async () => {
    const jsonStub = sandbox.stub();
    req.customFetch = sandbox.stub().resolves({ status: 204, json: jsonStub });

    const result = await personInfoClient(req).get();

    expect(result).to.deep.equal({ authSource: false });
    expect(jsonStub).to.not.have.been.called;
  });

  it("returns authSource:false when the response body fails validation", async () => {
    req.customFetch = sandbox
      .stub()
      .resolves(mockResponse({ body: { garbage: true } }));

    const result = await personInfoClient(req).get();

    expect(result).to.deep.equal({ authSource: false });
  });

  describe("schema validation failure", () => {
    const invalidVariants = {
      "wrong enum on nameParts.type": {
        ...VALID_RESPONSE,
        name: [
          {
            nameParts: [
              { type: "MiddleName", value: "KENNETH" },
              { type: "FamilyName", value: "DECERQUEIRA" }
            ]
          }
        ]
      },
      "wrong type on nameParts.value": {
        ...VALID_RESPONSE,
        name: [
          {
            nameParts: [
              { type: "GivenName", value: 12345 },
              { type: "FamilyName", value: "DECERQUEIRA" }
            ]
          }
        ]
      },
      "DVLA missing issueNumber": {
        ...VALID_RESPONSE,
        drivingPermit: [
          {
            personalNumber: "DOE99751010AL9OD",
            expiryDate: "2022-02-02",
            issueDate: "2012-02-02",
            issuedBy: "DVLA"
          }
        ]
      },
      "unexpected top-level key": {
        ...VALID_RESPONSE,
        veryPersonalInfo: "scared of the dark",
        name: "bad value"
      }
    };

    let warnSpy;

    beforeEach(() => {
      warnSpy = sandbox.spy();
      sandbox.stub(LOGGER, "child").returns({
        info: sandbox.spy(),
        warn: warnSpy
      });
    });

    Object.entries(invalidVariants).forEach(([label, body]) => {
      it(`does not log any PII value when: ${label}`, async () => {
        req.customFetch = sandbox.stub().resolves(mockResponse({ body }));

        const result = await personInfoClient(req).get();

        expect(result).to.deep.equal({ authSource: false });
        expect(warnSpy).to.have.been.calledOnce;

        const serialised = JSON.stringify(warnSpy.firstCall.args);
        for (const pii of PII_VALUES) {
          expect(serialised, `leaked PII value "${pii}"`).to.not.include(pii);
        }
      });
    });
  });

  it("propagates customFetch errors", async () => {
    req.customFetch = sandbox
      .stub()
      .rejects(new Error("You didn't say the magic word!"));

    await expect(personInfoClient(req).get()).to.be.rejectedWith(
      "You didn't say the magic word!"
    );
  });
});

const { personInfoClient } = require("./person-info.client");

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
      headers: { session_id: "session-token" }
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

  it("propagates customFetch errors", async () => {
    req.customFetch = sandbox
      .stub()
      .rejects(new Error("You didn't say the magic word!"));

    await expect(personInfoClient(req).get()).to.be.rejectedWith(
      "You didn't say the magic word!"
    );
  });
});

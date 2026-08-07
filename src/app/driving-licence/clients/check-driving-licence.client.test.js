const { checkDrivingLicenceClient } = require("./check-driving-licence.client");

const body = {
  drivingLicenceNumber: "SMITH9702105LN99",
  issueNumber: "12",
  postcode: "SW1 EQR",
  surname: "Smith",
  forenames: ["Dan", "Joe"],
  dateOfBirth: "10/02/1975",
  expiryDate: "15/01/2035",
  issueDate: "10/02/2005",
  licenceIssuer: "DVLA"
};

describe("checkDrivingLicenceClient", () => {
  let req;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    req.session.tokenId = "session-token";
  });

  afterEach(() => sandbox.restore());

  it("POSTs the check-driving-licence API with JSONified body and correct headers", async () => {
    req.customFetch = sandbox
      .stub()
      .resolves({ json: async () => ({ retry: false }) });

    await checkDrivingLicenceClient(req).post(body, {
      "document-checking-route": "direct"
    });

    expect(req.customFetch).to.have.been.calledOnceWithExactly(
      "/check-driving-licence",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "document-checking-route": "direct",
          session_id: "session-token"
        },
        timeoutMs: 30_000
      }
    );
  });

  it("returns a result when the response passes validation", async () => {
    req.customFetch = sandbox
      .stub()
      .resolves({ json: async () => ({ retry: true }) });

    const result = await checkDrivingLicenceClient(req).post(body);

    expect(result).to.deep.equal({ retry: true });
  });

  it("returns retry:false when the response fails validation", async () => {
    req.customFetch = sandbox
      .stub()
      .resolves({ json: async () => ({ unexpected: "shape" }) });

    const result = await checkDrivingLicenceClient(req).post(body);

    expect(result).to.deep.equal({ retry: false });
  });

  it("propagates customFetch errors", async () => {
    req.customFetch = sandbox
      .stub()
      .rejects(new Error("You didn't say the magic word!"));

    await expect(checkDrivingLicenceClient(req).post(body)).to.be.rejectedWith(
      "You didn't say the magic word!"
    );
  });
});

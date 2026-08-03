const BaseController = require("hmpo-form-wizard").Controller;
const ValidateController = require("./validate");

const SESSION_ID = "drivingLicence123";

const buildSessionModel = (req) => {
  req.sessionModel.set("drivingLicenceNumber", "SMITH9702105LN99");
  req.sessionModel.set("issueNumber", "12");
  req.sessionModel.set("postcode", "SW1 EQR");
  req.sessionModel.set("surname", "Smith");
  req.sessionModel.set("firstName", "Dan");
  req.sessionModel.set("middleNames", "Joe");
  req.sessionModel.set("dateOfBirth", "10/02/1975");
  req.sessionModel.set("expiryDate", "15/01/2035");
  req.sessionModel.set("issueDate", "10/02/2005");
  req.sessionModel.set("dateOfIssue", "10/02/2005");
  req.sessionModel.set("licenceIssuer", "DVLA");
};

const expectedAttributes = {
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

describe("validate controller", () => {
  const validate = new ValidateController({ route: "/test" });
  let req;
  let res;
  let next;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
    req.session.tokenId = SESSION_ID;
  });

  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(validate).to.be.an.instanceof(BaseController);
  });

  it("POSTs API with session model data", async () => {
    buildSessionModel(req);
    req.customFetch = sandbox
      .stub()
      .resolves({ json: async () => ({ retry: false }) });

    await validate.saveValues(req, res, next);

    expect(req.customFetch).to.have.been.calledOnce;
    const [path, opts] = req.customFetch.firstCall.args;
    expect(path).to.equal("/check-driving-licence");
    expect(opts.method).to.equal("POST");
    expect(JSON.parse(opts.body)).to.deep.equal(expectedAttributes);
    expect(opts.headers).to.include({
      "Content-Type": "application/json",
      session_id: SESSION_ID
    });
  });

  it("adds document-checking-route header when featureSet=direct", async () => {
    buildSessionModel(req);
    req.session.featureSet = "direct";
    req.customFetch = sandbox
      .stub()
      .resolves({ json: async () => ({ retry: false }) });

    await validate.saveValues(req, res, next);

    const [, opts] = req.customFetch.firstCall.args;
    expect(opts.headers).to.include({ "document-checking-route": "direct" });
  });

  it("sets showRetryMessage=true when the API returns retry:true", async () => {
    buildSessionModel(req);
    req.customFetch = sandbox
      .stub()
      .resolves({ json: async () => ({ retry: true }) });

    await validate.saveValues(req, res, next);

    expect(req.sessionModel.get("showRetryMessage")).to.equal(true);
  });

  it("does not set showRetryMessage when the API returns retry:false", async () => {
    buildSessionModel(req);
    req.customFetch = sandbox
      .stub()
      .resolves({ json: async () => ({ retry: false }) });

    await validate.saveValues(req, res, next);

    expect(req.sessionModel.get("showRetryMessage")).to.be.undefined;
  });

  it("forwards errors to the callback when the check-driving-licence call throws", async () => {
    buildSessionModel(req);
    const err = new Error("self-destruct sequence initiated");
    err.stack =
      "Error: self-destruct sequence initiated\n    at validate (test)";
    req.customFetch = sandbox.stub().rejects(err);

    await validate.saveValues(req, res, next);

    expect(next).to.have.been.calledOnceWithExactly(err);
  });
});

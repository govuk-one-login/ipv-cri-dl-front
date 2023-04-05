const BaseController = require("hmpo-form-wizard").Controller;
const LicenceIssuerController = require("./licence-issuer");

describe("licence issuer controller", () => {
  const licenceIssuerController = new LicenceIssuerController({
    route: "/test",
  });

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
  });
  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(licenceIssuerController).to.be.an.instanceOf(BaseController);
  });

  it("should throw an error if action is invalid", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        licenceIssuer: "fake action",
      },
    };

    await licenceIssuerController.saveValues(req, res, next);

    expect(next).to.have.been.calledWith(
      sinon.match.has(
        "message",
        "licence-issuer: Invalid action " + req.form.values.licenceIssuer
      )
    );
  });

  it("should set noLicence to true in sessionModel when licenceIssuer has 'noLicence' value", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        licenceIssuer: "noLicence",
      },
    };

    await licenceIssuerController.saveValues(req, res, next);

    expect(req.sessionModel.get("noLicence")).to.eq(true);
  });

  it("should not have noLicence in sessionModel when licenceIssuer has 'DVLA' value", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        licenceIssuer: "DVLA",
      },
    };

    await licenceIssuerController.saveValues(req, res, next);

    expect(req.sessionModel.get("noLicence")).to.eq(undefined);
  });

  it("should not have noLicence in sessionModel when licenceIssuer has 'DVA' value", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        licenceIssuer: "DVA",
      },
    };

    await licenceIssuerController.saveValues(req, res, next);

    expect(req.sessionModel.get("noLicence")).to.eq(undefined);
  });
});

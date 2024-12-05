const BaseController = require("hmpo-form-wizard").Controller;
const CheckYourDetailsController = require("./check-your-details");

describe("check your details controller", () => {
  const checkYourDetailsController = new CheckYourDetailsController({
    route: "/test"
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
    expect(checkYourDetailsController).to.be.an.instanceOf(BaseController);
  });

  it("should throw an error if action is invalid", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        confirmDetails: "fake action"
      }
    };

    await checkYourDetailsController.saveValues(req, res, next);

    expect(next).to.have.been.calledWith(
      sinon.match.has(
        "message",
        "check-your-details: Invalid action - " + req.form.values.confirmDetails
      )
    );
  });

  it("should set detailsNotConfirmed to true in sessionModel when confirmDetails has 'detailsNotConfirmed' value", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        confirmDetails: "detailsNotConfirmed"
      }
    };

    await checkYourDetailsController.saveValues(req, res, next);

    expect(req.sessionModel.get("detailsNotConfirmed")).to.eq(true);
  });

  it("should not have detailsNotConfirmed in sessionModel when confirmDetails has 'detailsConfirmed' value", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        confirmDetails: "detailsConfirmed"
      }
    };

    await checkYourDetailsController.saveValues(req, res, next);
    expect(req.sessionModel.get("detailsNotConfirmed")).to.eq(undefined);
  });
});

const BaseController = require("hmpo-form-wizard").Controller;
const ProveAnotherWayController = require("./prove-another-way");
const axios = require("axios");

describe("prove another way controller", () => {
  const proveAnotherWayController = new ProveAnotherWayController({
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
    expect(proveAnotherWayController).to.be.an.instanceOf(BaseController);
  });

  it("should throw an error if action is invalid", async () => {
    const sessionId = "drivingLicence123";
    req.session.sessionId = sessionId;
    req.form = {
      values: {
        proveAnotherWayRadio: "fake action",
      },
    };

    await proveAnotherWayController.saveValues(req, res, next);

    expect(next).to.have.been.calledWith(
      sinon.match.has(
        "message",
        "prove-another-way: Invalid action " +
          req.form.values.proveAnotherWayRadio
      )
    );
  });

  it("should not store redirect_url in session when users selects retry", async () => {
    req.session.sessionId = "drivingLicence123";
    req.sessionModel.set("redirect_url", "url");

    req.form = {
      values: {
        proveAnotherWayRadio: "retry",
      },
    };

    const data = {
      client: {
        redirectUrl:
          "https://client.example.com/cb?id=DrivingLicenceIssuer&code=1234",
      },
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(axios, "post").returns(resolvedPromise);

    await proveAnotherWayController.saveValues(req, res, next);

    expect(req.session.test.redirect_url).to.eq(undefined);
  });

  it("should return oauth url when sessionModel has a redirect_url value", () => {
    req.sessionModel.set("redirect_url", "url");
    const result = proveAnotherWayController.next(req);
    expect(result).to.eq("/oauth2/callback");
  });

  it("should return url for driving licence details value when sessionModel has a redirect_url value", () => {
    const result = proveAnotherWayController.next(req);
    expect(result).to.eq("/driving-licence/details");
  });
});

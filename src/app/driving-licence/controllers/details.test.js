import wizard from "hmpo-form-wizard";
import { DrivingLicenceDetailsController } from "./details.js";

const BaseController = wizard.Controller;

describe("details controller", () => {
  const details = new DrivingLicenceDetailsController({ route: "/test" });

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
    expect(details).to.be.an.instanceOf(BaseController);
  });

  it("should clear showRetryMessage in session", async () => {
    req.sessionModel.set("showRetryMessage", true);
    req.form = {
      options: {
        dateFields: []
      }
    };

    await details.saveValues(req, res, next);

    const showRetryMessage = req.sessionModel.get("showRetryMessage");
    expect(showRetryMessage).to.equal(false);
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await details._padYear(value, offset);

    expect(finalYear).to.equal("30");
  });
});

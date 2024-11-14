const BaseController = require("hmpo-form-wizard").Controller;
const ConsentController = require("./consent");

describe("consent controller", () => {
  const consentController = new ConsentController({
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
    expect(consentController).to.be.an.instanceOf(BaseController);
  });

  it("should call the next method when posted to", async () => {
    await consentController.saveValues(req, res, next);

    expect(next).to.have.been.called;
  });
});

const RootController = require("./root");
const { Controller: BaseController } = require("hmpo-form-wizard");
const appConfig = require("../../../lib/config");

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

const res200 = (body) => ({ status: 200, json: async () => body });
const res204 = () => ({ status: 204 });

describe("root controller", () => {
  const root = new RootController({ route: "/test" });
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
    req.session.tokenId = "session-token";
  });

  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(root).to.be.an.instanceof(BaseController);
  });

  it("skips person-info call and sets isAuthSourceRoute=false when AUTH_SOURCE_ENABLED is false", async () => {
    sandbox.replace(appConfig.APP, "AUTH_SOURCE_ENABLED", "false");
    req.customFetch = sandbox.stub();

    await root.saveValues(req, res, next);

    expect(req.customFetch).to.not.have.been.called;
    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
  });

  describe("when AUTH_SOURCE_ENABLED is true", () => {
    beforeEach(() => {
      sandbox.replace(appConfig.APP, "AUTH_SOURCE_ENABLED", "true");
    });

    it("populates the session model and sets isAuthSourceRoute=true from a valid person-info response", async () => {
      req.customFetch = sandbox.stub().resolves(res200(VALID_RESPONSE));

      await root.saveValues(req, res, next);

      expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(true);
      expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(
        "DOE99751010AL9OD"
      );
      expect(req.sessionModel.get("expiryDate")).to.equal("2022-02-02");
      expect(req.sessionModel.get("issueDate")).to.equal("2012-02-02");
      expect(req.sessionModel.get("licenceIssuer")).to.equal("DVLA");
      expect(req.sessionModel.get("issueNumber")).to.equal("13");
      expect(req.sessionModel.get("postcode")).to.equal("BA2 5AA");
      expect(req.sessionModel.get("dateOfBirth")).to.equal("1965-07-08");
      expect(req.sessionModel.get("firstName")).to.equal("KENNETH");
      expect(req.sessionModel.get("middleNames")).to.equal("");
      expect(req.sessionModel.get("surname")).to.equal("DECERQUEIRA");
    });

    it("splits multiple GivenName parts into firstName + middleNames", async () => {
      const validResponseWithMiddleName = structuredClone(VALID_RESPONSE);
      validResponseWithMiddleName.name[0].nameParts = [
        { type: "GivenName", value: "KENNETH" },
        { type: "GivenName", value: "DIAMOND GEEZER" },
        { type: "FamilyName", value: "DECERQUEIRA" }
      ];
      req.customFetch = sandbox
        .stub()
        .resolves(res200(validResponseWithMiddleName));

      await root.saveValues(req, res, next);

      expect(req.sessionModel.get("firstName")).to.equal("KENNETH");
      expect(req.sessionModel.get("middleNames")).to.equal("DIAMOND GEEZER");
      expect(req.sessionModel.get("surname")).to.equal("DECERQUEIRA");
    });

    it("does not set issueNumber on the session when issuedBy is DVA", async () => {
      const validResponseWithDVA = structuredClone(VALID_RESPONSE);
      validResponseWithDVA.drivingPermit[0].issuedBy = "DVA";
      delete validResponseWithDVA.drivingPermit[0].issueNumber;
      req.customFetch = sandbox.stub().resolves(res200(validResponseWithDVA));

      await root.saveValues(req, res, next);

      expect(req.sessionModel.get("licenceIssuer")).to.equal("DVA");
      expect(req.sessionModel.get("issueNumber")).to.be.undefined;
    });

    it("forwards error to next when client throws", async () => {
      const err = new Error("crumbs");
      req.customFetch = sandbox.stub().rejects(err);

      await root.saveValues(req, res, next);

      expect(next).to.have.been.calledOnceWithExactly(err);
      expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
      expect(req.sessionModel.get("drivingLicenceNumber")).to.be.undefined;
    });

    it("isAuthSourceRoute=false and the session model is empty when person-info returns 204", async () => {
      req.customFetch = sandbox.stub().resolves(res204());

      await root.saveValues(req, res, next);

      expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
      expect(req.sessionModel.get("drivingLicenceNumber")).to.be.undefined;
      expect(req.sessionModel.get("firstName")).to.be.undefined;
    });
  });
});

import { sessionConfig } from "./session-config.js";
import { dynamoSessionConfig } from "./dynamo-session-config.js";

describe("app", () => {
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    sandbox
      .stub(dynamoSessionConfig, "createSessionStore")
      .returns("sessionStoreMock");
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("setup session", () => {
    it("should initialise session config", () => {
      var initialisedSessionConfig = sessionConfig.createSessionConfig();
      expect(initialisedSessionConfig).to.deep.equal({
        cookieName: "service_session",
        secret: "1234",
        cookieOptions: { maxAge: 7200000 },
        ...{ sessionStore: "sessionStoreMock" }
      });
    });

    it("should return true if table name is set", () => {
      var isDynamo = sessionConfig.isDynamo();
      expect(isDynamo).to.be.true;
    });
  });
});

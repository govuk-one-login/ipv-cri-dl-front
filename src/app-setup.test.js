const AppSetup = require("./app-setup");
const path = require("path");
const sessionConfig = require("./session-config");
const helmetConfig = require("@govuk-one-login/di-ipv-cri-common-express/src/lib/helmet");

describe("app-setup", () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    app = {
      set: sandbox.stub(),
      use: sandbox.stub()
    };
    router = {
      use: sandbox.stub()
    };
    setup = sandbox.stub().returns({ app, router });

    isDynamoBool = new Boolean(true);
    sessionConfigMap = sandbox.stub();

    sandbox.stub(sessionConfig, "init").returns({
      cookieName: "service_session",
      secret: 1234,
      cookieOptions: { maxAge: 7200000 },
      ...("table-name" && { sessionStore: {} })
    });
    sandbox.stub(sessionConfig, "isDynamo").returns(isDynamoBool);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("setup app", () => {
    it("should set GTM variables", () => {
      AppSetup.init(app, router);

      sinon.assert.calledWith(
        app.set,
        "APP.GTM.GA4_CONTAINER_ID",
        "GTM-XXXXXXX"
      );
      sinon.assert.calledWith(
        app.set,
        "APP.GTM.ANALYTICS_COOKIE_DOMAIN",
        "localhost"
      );
      sinon.assert.calledWith(app.set, "APP.GTM.UA_CONTAINER_ID", "UA-XXXXXXX");
      sinon.assert.calledWith(app.set, "APP.GTM.UA_ENABLED", false);
      sinon.assert.calledWith(app.set, "APP.GTM.GA4_ENABLED", true);
    });

    it("should set Device Intelligence  variables", () => {
      AppSetup.init(app, router);

      sinon.assert.calledWith(
        app.set,
        "APP.DEVICE_INTELLIGENCE_ENABLED",
        false
      );
      sinon.assert.calledWith(
        app.set,
        "APP.DEVICE_INTELLIGENCE_DOMAIN",
        "localhost"
      );
      sinon.assert.calledWith(
        app.set,
        "APP.DEVICE_INTELLIGENCE_ENABLED",
        false
      );
      sinon.assert.calledWith(
        app.set,
        "APP.DEVICE_INTELLIGENCE_DOMAIN",
        "localhost"
      );
    });

    it("should set API config variables", () => {
      AppSetup.init(app, router);

      sinon.assert.calledWith(app.set, "API.BASE_URL", "http://localhost:5007");
      sinon.assert.calledWith(app.set, "API.PATHS.SESSION", "/session");
      sinon.assert.calledWith(
        app.set,
        "API.PATHS.AUTHORIZATION",
        "/authorization"
      );
    });

    it("should set Oauth paths", () => {
      AppSetup.init(app, router);

      sinon.assert.calledWith(app.set, "APP.PATHS.ENTRYPOINT", "/");
    });

    it("should set application config", () => {
      const { app, router } = AppSetup.create(setup);

      const loggerConfig = {
        consoleLevel: "request",
        console: true,
        consoleJSON: true,
        app: false
      };

      const options = {
        config: { APP_ROOT: __dirname },
        port: false,
        logs: loggerConfig,
        session: {
          cookieName: "service_session",
          secret: 1234,
          cookieOptions: { maxAge: 7200000 },
          ...("table-name" && { sessionStore: {} })
        },
        helmet: helmetConfig,
        redis: isDynamoBool ? false : commonExpress.lib.redis(),
        urls: {
          public: "/public",
          publicImages: "/public/images"
        },
        publicDirs: ["../dist/public"],
        publicImagesDirs: ["../dist/public/images"],
        translation: {
          allowedLangs: ["en", "cy"],
          fallbackLang: ["en"],
          cookie: { name: "lng" }
        },
        views: [
          path.resolve(
            path.dirname(
              require.resolve("@govuk-one-login/di-ipv-cri-common-express")
            ),
            "components"
          ),
          path.resolve("node_modules/@govuk-one-login/"),
          "views"
        ],
        //Ignoring middleware setup as arrow function cannot be asserted
        dev: true
      };
      sinon.assert.calledOnce(setup);
      sinon.assert.calledWithMatch(setup, options);
    });

    it("should pass a middlewareSetupFn to setup", () => {
      AppSetup.create(setup);

      const setupArgs = setup.firstCall.args[0];
      expect(setupArgs).to.have.property("middlewareSetupFn");
      expect(setupArgs.middlewareSetupFn).to.be.a("function");
    });

    describe("middlewareSetupFn", () => {
      let middlewareSetupFn;
      let mockApp;
      let mockNunjucksEnv;

      beforeEach(() => {
        AppSetup.create(setup);
        middlewareSetupFn = setup.firstCall.args[0].middlewareSetupFn;
        mockNunjucksEnv = {
          addGlobal: sandbox.stub(),
          addFilter: sandbox.stub()
        };
        mockApp = {
          get: sandbox.stub(),
          use: sandbox.stub(),
          locals: {}
        };
      });

      it("should register frontend-ui globals and locals middleware when nunjucks env exists", () => {
        mockApp.get.withArgs("nunjucks").returns(mockNunjucksEnv);

        middlewareSetupFn(mockApp);

        sinon.assert.calledWith(mockApp.get, "nunjucks");
        // addFrontendUiGlobals registers globals on the nunjucks env
        expect(mockNunjucksEnv.addGlobal.callCount).to.be.greaterThan(0);
        // localsMiddleware and setHeaders are added via app.use
        expect(mockApp.use.callCount).to.be.greaterThanOrEqual(2);
      });

      it("should skip frontend-ui setup when nunjucks env is not available", () => {
        mockApp.get.withArgs("nunjucks").returns(null);

        middlewareSetupFn(mockApp);

        // addFrontendUiGlobals should not have been called
        expect(mockNunjucksEnv.addGlobal.called).to.be.false;
        // app.use should still be called for setHeaders
        expect(mockApp.use.callCount).to.be.greaterThanOrEqual(1);
      });
    });
  });
});

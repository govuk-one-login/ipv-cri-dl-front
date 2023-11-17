const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class LicenceIssuerController extends BaseController {
  async saveValues(req, res, next) {
    try {
      req.sessionModel.reset();
      logger.info("user submitting licence issuer", { req, res });
      req.sessionModel.set("noLicence", undefined);

      const action = req.form.values.licenceIssuer;
      req.sessionModel.set("licenceIssuer", action);
      req.sessionModel.set("issuerDependent", action);

      switch (action) {
        case "noLicence": {
          logger.info(
            "licence-issuer: user has no licence, routing back to IPVCore",
            { req, res }
          );
          req.sessionModel.set("noLicence", true);
          return next();
        }
        case "DVLA": {
          logger.info(
            "licence-issuer: user selected DVLA : redirecting to driving licence details",
            {
              req,
              res
            }
          );
          return next();
        }
        case "DVA": {
          logger.info(
            "licence-issuer: user selected DVA : redirecting to driving licence details",
            {
              req,
              res
            }
          );
          return next();
        }
      }
      return next(new Error("licence-issuer: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = LicenceIssuerController;

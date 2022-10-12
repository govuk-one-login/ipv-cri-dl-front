const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class LicenceIssuerController extends BaseController {
  async saveValues(req, res, next) {
    try {
      logger.info("user submitting licence issuer", { req, res });
      req.sessionModel.set("redirect_url", undefined);

      const action = req.form.values.licenceIssuerRadio;
      req.sessionModel.set("licenceIssuer", action);

      switch (action) {
      //TODO needs updated
        case "noLicence": {
          logger.info(
            "licence-issuer: user has no licence, routing back to IPVCore - calling build-client-oauth-response lambda",
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
              res,
            }
          );
          return next();
        }
          case "DVA": {
            logger.info(
              "licence-issuer: user selected DVA : redirecting to driving licence details",
              {
                req,
                res,
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

  next(req) {
    if (req.sessionModel.get("noLicence")) {
      return "/oauth2/callback";
    } else {
      return "/details";
    }
  }
}

module.exports = LicenceIssuerController;

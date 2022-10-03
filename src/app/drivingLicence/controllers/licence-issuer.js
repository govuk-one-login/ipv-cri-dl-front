const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

const {
  API,
  APP
} = require("../../../lib/config");

class LicenceIssuerController extends BaseController {
  async saveValues(req, res, next) {
    try {
      logger.info("user submitting licence issuer", { req, res });
      req.sessionModel.set("redirect_url", undefined);

      const action = req.form.values.licenceIssuerRadio;

      const headers = {
        session_id: req.session.sessionId,
      };

      switch (action) {
      //TODO needs updated
        case "noLicence": {
          logger.info(
            "licence-issuer: user has no licence, routing back to IPVCore - calling build-client-oauth-response lambda",
            { req, res }
          );
          const apiResponse = await req.axios.post(
            `${API.BASE_URL}${APP.PATH.DRIVING_LICENCE}`,
            undefined,
            { headers: headers }
          );
          logger.info(
            "licence-issuer: redirecting user to callBack " +
              apiResponse?.data?.client?.redirectUrl,
            {
              req,
              res,
            }
          );
          const redirect_url = apiResponse?.data?.client?.redirectUrl;
          req.sessionModel.set("redirect_url", redirect_url);
          return next();
        }
        case "licenceIssuer": {
          logger.info(
            "licence-issuer: user selected DVLA : redirecting to driving licence details",
            {
              req,
              res,
            }
          );
          return next();
        }
          case "licenceIssuer2": {
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
    if (req.sessionModel.get("redirect_url")) {
      return "/oauth2/callback";
    } else {
      return "/driving-licence/details";
    }
  }
}

module.exports = LicenceIssuerController;

const BaseController = require("hmpo-form-wizard").Controller;
const { PACKAGE_NAME } = require("../../../lib/config");
const logger =
  require("@govuk-one-login/di-ipv-cri-common-express/src/bootstrap/lib/logger").get(
    PACKAGE_NAME
  );

class CheckYourDetailsController extends BaseController {
  async saveValues(req, res, next) {
    try {
      req.sessionModel.set("detailsNotConfirmed", undefined);
      const action = req.form.values.confirmDetails;

      switch (action) {
        case "detailsNotConfirmed": {
          logger.info(
            "check-your-details: User has indicated details are incorrect, routing back to IPVCore",
            { req, res }
          );
          req.sessionModel.set("detailsNotConfirmed", true);
          return next();
        }
        case "detailsConfirmed": {
          logger.info(
            "check-your-details: User has confirmed details : redirecting to driving licence API",
            {
              req,
              res
            }
          );
          return next();
        }
      }
      return next(new Error("check-your-details: Invalid action - " + action));
    } catch (err) {
      logger.error(
        "check-your-details: Unable to set session model error - " + err
      );
      return next(err);
    }
  }
}
module.exports = CheckYourDetailsController;

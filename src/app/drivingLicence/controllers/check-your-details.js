const LOGGER = require("../../../utils/logger");
const BaseController = require("hmpo-form-wizard").Controller;

class CheckYourDetailsController extends BaseController {
  async saveValues(req, res, next) {
    try {
      req.sessionModel.set("detailsNotConfirmed", undefined);
      const action = req.form.values.confirmDetails;

      switch (action) {
        case "detailsNotConfirmed": {
          LOGGER.info(
            "check-your-details: user has indicated details are incorrect, routing back to IPVCore"
          );
          req.sessionModel.set("detailsNotConfirmed", true);
          return next();
        }
        case "detailsConfirmed": {
          LOGGER.info(
            "check-your-details: user has confirmed details, redirecting to driving licence API"
          );
          return next();
        }
      }
      return next(new Error(`invalid action: ${action}`));
    } catch (err) {
      LOGGER.logError(req, err, {
        messagePrefix: "check-your-details"
      });
      return next(err);
    }
  }
}
module.exports = CheckYourDetailsController;

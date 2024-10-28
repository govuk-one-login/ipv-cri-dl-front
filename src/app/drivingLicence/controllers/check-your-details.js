const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const logger = require("hmpo-logger").get();

class CheckYourDetailsController extends BaseController {
  async saveValues(req, res, next) {
  logger.info("!!!!!!!!!!!!!!! in checkyourdetails!");

    try {
      req.sessionModel.reset();

      req.sessionModel.set("detajlsNotConfirmed", undefined);

      const action = req.form.values.confirmDetails;
      logger.info("*********** req.form.values.confirmDetails = " + action );
      const testField = req.form.values.testField;
      logger.info("*********** req.form.values.testField = " + testField);
      logger.info("*********** req.form.values.event = " + req.form.values.event);
      req.sessionModel.set("detailsNotConfirmed", action);
      logger.info("*********** req.sessionModel.detailsNotConfirmed = " + req.sessionModel.detailsNotConfirmed );

      switch (action) {
        case "detailsNotConfirmed": {
          logger.info(
            "check-your-details: user has indicated details are incorrect, routing back to IPVCore",
            { req, res }
          );
          req.sessionModel.set("detailsNotConfirmed", true);
          return next();
        }
        case "detailsConfirmed": {
          logger.info(
            "check-your-details: user has confirmed details : redirecting to driving licence API",
            {
              req,
              res
            }
          );
          return next();
        }
      }
      return next(new Error("check-your-details: Invalid action " + action));
    } catch (err) {
      logger.error("******* " + err );
      logger.info("!!!!!!!!!!!!!! errors = " + getErrors(req, res))
      callback();
      return next(err);
    }
  }
 }
module.exports = CheckYourDetailsController;

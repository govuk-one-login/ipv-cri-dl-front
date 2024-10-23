const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const logger = require("hmpo-logger").get();

class CheckYourDetailsController extends BaseController {
  async saveValues(req, res, next) {
//  req.sessionModel.reset();
    try {
      logger.info("!!!!!!!!!!!!!!! in checkyourdetails!");
//  logger.info("!!!!!!!!!!!!!! errors = " + getErrors(req, res))
//    logger.info("!!!!!!!!!!!! checkYourDetails = " + req.form.values.checkYourDetails);
//    callback();
      return next();
     } catch (err) {
     logger.error("******* " + err );
      return next(err);
    }
  };
 }
module.exports = CheckYourDetailsController;

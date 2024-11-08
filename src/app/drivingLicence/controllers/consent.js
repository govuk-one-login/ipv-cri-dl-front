const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class ConsentController extends BaseController {
  async saveValues(req, res, next) {
    try {
      return next();
    } catch (err) {
      logger.error("Error in consent controller - " + err);
      return next(err);
    }
  }
}
module.exports = ConsentController;

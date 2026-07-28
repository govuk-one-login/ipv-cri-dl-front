const BaseController = require("hmpo-form-wizard").Controller;
const LOGGER = require("../../../utils/logger");

class ConsentController extends BaseController {
  async saveValues(req, res, next) {
    try {
      return next();
    } catch (err) {
      LOGGER.logError(req, err, {
        messagePrefix: "consent"
      });
      return next(err);
    }
  }
}
module.exports = ConsentController;

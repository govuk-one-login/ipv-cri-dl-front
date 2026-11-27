import wizard from "hmpo-form-wizard";
import LOGGER from "../../../utils/logger.js";

const BaseController = wizard.Controller;

export class ConsentController extends BaseController {
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

import LOGGER from "../../../utils/logger.js";
import wizard from "hmpo-form-wizard";

import hmpoComponents from "hmpo-components";
const { mixins } = hmpoComponents;
const BaseController = wizard.Controller;

const DateControllerMixin = mixins.Date;
const DateController = DateControllerMixin(BaseController);

export class DrivingLicenceDetailsController extends DateController {
  _padYear(value, offset) {
    LOGGER.info(`offset value of ${offset} ignored as no padding is applied`);
    return value;
  }
  async saveValues(req, res, callback) {
    super.saveValues(req, res, () => {
      req.sessionModel.set("showRetryMessage", false);
      callback();
    });
  }
}

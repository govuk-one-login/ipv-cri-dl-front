const BaseController = require("hmpo-form-wizard").Controller;
const { PACKAGE_NAME } = require("../../../lib/config");
const logger =
  require("@govuk-one-login/di-ipv-cri-common-express/src/bootstrap/lib/logger").get(
    PACKAGE_NAME
  );

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

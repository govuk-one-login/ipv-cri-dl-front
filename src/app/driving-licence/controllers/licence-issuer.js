import wizard from "hmpo-form-wizard";
import LOGGER from "../../../utils/logger.js";

const BaseController = wizard.Controller;

export class LicenceIssuerController extends BaseController {
  async saveValues(req, res, next) {
    try {
      req.sessionModel.reset();
      LOGGER.info("user submitting licence issuer");
      req.sessionModel.set("noLicence", undefined);

      const action = req.form.values.licenceIssuer;
      req.sessionModel.set("licenceIssuer", action);
      req.sessionModel.set("issuerDependent", action);

      switch (action) {
        case "noLicence": {
          LOGGER.info(
            "licence-issuer: user has no licence, routing back to IPVCore"
          );
          req.sessionModel.set("noLicence", true);
          return next();
        }
        case "DVLA": {
          LOGGER.info(
            "licence-issuer: user selected DVLA, redirecting to driving licence details"
          );
          return next();
        }
        case "DVA": {
          LOGGER.info(
            "licence-issuer: user selected DVA, redirecting to driving licence details"
          );
          return next();
        }
      }
      return next(new Error(`invalid action: ${action}`));
    } catch (err) {
      LOGGER.logError(req, err, {
        messagePrefix: "licence-issuer"
      });
      return next(err);
    }
  }
}

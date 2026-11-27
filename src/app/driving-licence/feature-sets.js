import LOGGER from "../../utils/logger.js";

export function featureSet(req, res, next) {
  try {
    const featureSet = req.query.featureSet;
    const isValidFeatureSet = /^\w{1,32}$/.test(featureSet);
    if (!isValidFeatureSet) {
      throw new Error("Invalid feature set ID");
    }

    if (featureSet !== undefined) {
      LOGGER.info(`feature set is ${featureSet}`);
      req.session.featureSet = featureSet;
    }
    next();
  } catch (error) {
    return next(error);
  }
}

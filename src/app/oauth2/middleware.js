const axios = require("axios");
const {
  API_BASE_URL,
  API_INITIALISE_SESSION_REQ_PATH,
} = require("../../lib/config");
const { redirectOnError } = require("../shared/oauth");
const logger = require("hmpo-logger").get();

module.exports = {
  decryptJWTAuthorizeRequest: async (req, res, next) => {
    const requestJWT = req.query?.request;
    const headers = {
      client_id: req.query?.client_id,
    };
logger.info("JB!@£$%^&*req" + JSON.stringify(req))
        const jwtRequest = {
          request: requestJWT,
          client_id: req.session.authParams.client_id,
        };
logger.info("JB!@£$%^&*jwtRequest" + JSON.stringify(jwtRequest))
logger.info("JB!@£$%^&*requestJWT" + requestJWT)
logger.info("JB!@£$%^&*headers" + headers)

    if (!requestJWT) {
      return next(new Error("JWT Missing"));
    }

    try {
      const apiResponse = await axios.post(
        `${API_BASE_URL}${API_INITIALISE_SESSION_REQ_PATH}`,
        requestJWT,
        { headers: headers }
      );
      logger.info("response received from JWT authorize lambda", { req, res });

      let { sessionId, shared_claims } = apiResponse.data;

      req.session.shared_claims = shared_claims;
      req.session.sessionId = sessionId;

      return next();
    } catch (error) {
      logger.error("error calling JWT authorize lambda", { req, res });
      return redirectOnError(error, res, next);
    }
  },

  redirectToDrivingLicenceDetailsPage: async (req, res) => {
    logger.info("redirecting to driving licence details page", { req, res });
    res.redirect("/driving-licence");
  },

  redirectToCallback: async (req, res) => {
    const redirectUrl =
      req.session["hmpo-wizard-cri-driving-licence-front"].redirect_url;
    res.redirect(redirectUrl);
  },
};

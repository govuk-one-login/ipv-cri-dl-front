import commonExpress from "@govuk-one-login/di-ipv-cri-common-express";
import { steps } from "./app/driving-licence/steps.js";
import { fields } from "./app/driving-licence/fields.js";
import { featureSet } from "./app/driving-licence/feature-sets.js";
import { frontendUiMiddlewareIdentityBypass } from "@govuk-one-login/frontend-ui";
import wizard from "hmpo-form-wizard";

const { getGTM, getDeviceIntelligence } = commonExpress.lib.locals;
const setScenarioHeaders = commonExpress.lib.scenarioHeaders;
const customFetch = commonExpress.lib.customFetch.customFetchMiddleware;

export const init = (router) => {
  router.use(getGTM);
  router.use(frontendUiMiddlewareIdentityBypass);
  router.use(getDeviceIntelligence);
  router.use(setScenarioHeaders);
  router.use(customFetch);
  router.use(featureSet);

  router.use("/oauth2", commonExpress.routes.oauth2);

  const wizardOptions = {
    name: "cri-driving-licence-front",
    journeyName: "drivingLicence",
    templatePath: "driving-licence"
  };

  router.use(wizard(steps, fields, wizardOptions));

  router.use(commonExpress.lib.errorHandling.redirectAsErrorToCallback);
};

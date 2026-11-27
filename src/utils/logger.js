import pkg from "../../package.json" with { type: "json" };
import commonExpress from "@govuk-one-login/di-ipv-cri-common-express";

const { name: packageName } = pkg;
const { bootstrap } = commonExpress;

const wrapper = bootstrap.logger;

/** @type {import("pino").Logger} */
const LOGGER = wrapper.get(packageName);

/**
 * @param {import("express").Request} req
 * @param {Error} err
 * @param {{ messagePrefix?: string }} [options]
 */
LOGGER.logError = (req, err, options) =>
  wrapper.logError(req, err, { logger: LOGGER, ...options });

export default LOGGER;

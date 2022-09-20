const express = require("express");
const wizard = require("hmpo-form-wizard");

const steps = require("./steps");
const fields = require("./fields");

const router = express.Router();

const wizardOptions = {
  name: "cri-driving-licence-front",
  journeyName: "drivingLicence",
  templatePath: "drivingLicence",
};

router.use(wizard(steps, fields, wizardOptions));

module.exports = router;

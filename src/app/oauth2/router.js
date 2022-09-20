const express = require("express");

const router = express.Router();

const {
  redirectToCallback,
  redirectToDrivingLicenceDetailsPage,
  decryptJWTAuthorizeRequest,
} = require("./middleware");

router.get(
  "/authorize",
  decryptJWTAuthorizeRequest,
  redirectToDrivingLicenceDetailsPage
);
router.get("/callback", redirectToCallback);

module.exports = router;

const DrivingLicenceSubject = require("../model/DrivingLicenceSubject.js");
const DVADrivingLicenceSubject = require("../model/DVADrivingLicenceSubject.js");

exports.getDVLATestUserFromMap = function (
  issuer,
  drivingLicenceSubjectScenario
) {
  var primaryDVLALicence = new DrivingLicenceSubject();
  primaryDVLALicence.fill({
    licenceNumber: "PARKE610112PBFGH",
    birthDay: "11",
    birthMonth: "10",
    birthYear: "1962",
    licenceIssueDay: "23",
    licenceIssueMonth: "05",
    licenceIssueYear: "2018",
    issueNumber: "12",
    consentDVLACheckbox: "true",
    middleNames: "BENJAMIN",
    lastName: "PARKER",
    firstName: "PETER",
    licenceValidToDay: "09",
    licenceValidToMonth: "12",
    licenceValidToYear: "2062",
    postcode: "BS98 1TL"
  });
  var primaryDVLAKennethLicence = new DrivingLicenceSubject();
  primaryDVLAKennethLicence.fill({
    licenceNumber: "DECER607085KE9LN",
    birthDay: "08",
    birthMonth: "07",
    birthYear: "1965",
    licenceIssueDay: "19",
    licenceIssueMonth: "04",
    licenceIssueYear: "2018",
    issueNumber: "23",
    consentDVLACheckbox: "true",
    middleNames: " ",
    lastName: "DECERQUEIRA",
    firstName: "KENNETH",
    licenceValidToDay: "01",
    licenceValidToMonth: "10",
    licenceValidToYear: "2042",
    postcode: "BA2 5AA"
  });

  if (issuer === "DVLA") {
    if (drivingLicenceSubjectScenario === "DrivingLicenceSubjectHappyPeter") {
      return primaryDVLALicence;
    }

    if (drivingLicenceSubjectScenario === "DrivingLicenceSubjectHappyKenneth") {
      return primaryDVLAKennethLicence;
    }
  }
};

exports.getDVATestUserFromMap = function (
  issuer,
  drivingLicenceSubjectScenario
) {
  var primaryDVALicence = new DVADrivingLicenceSubject();
  primaryDVALicence.fill({
    licenceNumber: "55667788",
    birthDay: "26",
    birthMonth: "07",
    birthYear: "1981",
    licenceIssueDay: "19",
    licenceIssueMonth: "04",
    licenceIssueYear: "2018",
    consentDVACheckbox: "true",
    middleNames: "",
    lastName: "BATSON",
    firstName: "BILLY",
    licenceValidToDay: "01",
    licenceValidToMonth: "10",
    licenceValidToYear: "2042",
    postcode: "NW3 5RG"
  });

  if (issuer === "DVA") {
    if (drivingLicenceSubjectScenario === "DrivingLicenceSubjectHappyBilly") {
      return primaryDVALicence;
    }
  }
};

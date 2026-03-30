const DrivingLicenceSubject = require("../model/DrivingLicenceSubject.js");
const DVADrivingLicenceSubject = require("../model/DVADrivingLicenceSubject.js");

const dvlaTestUsers = {
  DrivingLicenceSubjectHappyPeter: {
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
  },
  DrivingLicenceSubjectHappyKenneth: {
    licenceNumber: "DECER607085K99AE",
    birthDay: "08",
    birthMonth: "07",
    birthYear: "1965",
    licenceIssueDay: "02",
    licenceIssueMonth: "05",
    licenceIssueYear: "2025",
    issueNumber: "17",
    consentDVLACheckbox: "true",
    middleNames: "",
    lastName: "DECERQUEIRA",
    firstName: "KENNETH",
    licenceValidToDay: "01",
    licenceValidToMonth: "05",
    licenceValidToYear: "2035",
    postcode: "BA2 5AA"
  }
};

exports.getDVLATestUserFromMap = function (drivingLicenceSubjectKey) {
  const data = dvlaTestUsers[drivingLicenceSubjectKey];
  if (!data) {
    throw new Error(`Unknown DVLA test user: ${drivingLicenceSubjectKey}`);
  }
  const subject = new DrivingLicenceSubject();
  subject.fill(data);
  return subject;
};

exports.isDVLAUser = function (key) {
  return key in dvlaTestUsers;
};

const dvaTestUsers = {
  DrivingLicenceSubjectHappyBilly: {
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
  },
  DVADrivingLicenceSubjectHappyKenneth: {
    licenceNumber: "12345678",
    birthDay: "08",
    birthMonth: "07",
    birthYear: "1965",
    licenceIssueDay: "19",
    licenceIssueMonth: "04",
    licenceIssueYear: "2018",
    consentDVACheckbox: "true",
    middleNames: "",
    lastName: "DECERQUEIRA",
    firstName: "KENNETH",
    licenceValidToDay: "01",
    licenceValidToMonth: "10",
    licenceValidToYear: "2042",
    postcode: "BA2 5AA"
  }
};

exports.getDVATestUserFromMap = function (drivingLicenceSubjectKey) {
  const data = dvaTestUsers[drivingLicenceSubjectKey];
  if (!data) {
    throw new Error(`Unknown DVA test user: ${drivingLicenceSubjectKey}`);
  }
  const subject = new DVADrivingLicenceSubject();
  subject.fill(data);
  return subject;
};

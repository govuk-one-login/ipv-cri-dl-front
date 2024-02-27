const { firstNameMiddleNameLengthValidator } = require("./fieldsHelper");
const { surnameLengthValidator } = require("./fieldsHelper");
const { firstNameLengthValidator } = require("./fieldsHelper");
const { middleNamesLengthValidator } = require("./fieldsHelper");
const fields = require("./fieldsHelper");

const firstNameMiddleNameLengthValidatorObj = {
  fn: firstNameMiddleNameLengthValidator,
  arguments: [38, "firstName", "middleNames", "issuerDependent"]
};

const surnameLengthValidatorObj = {
  fn: surnameLengthValidator,
  arguments: [43, "surname", "issuerDependent"]
};

const firstNameLengthValidatorObj = {
  fn: firstNameLengthValidator,
  arguments: [38, "firstName", "issuerDependent"]
};

const middleNamesLengthValidatorObj = {
  fn: middleNamesLengthValidator,
  arguments: [38, "middleNames", "issuerDependent"]
};

const dvlaValidatorObj = {
  fn: fields.dvlaValidator,
  arguments: [
    "firstName",
    "middleNames",
    "surname",
    "dateOfBirth",
    "drivingLicenceNumber"
  ]
};

module.exports = {
  firstNameMiddleNameLengthValidator: fields.firstNameMiddleNameLengthValidator,
  surnameLengthValidator: fields.surnameLengthValidator,
  firstNameLengthValidator: fields.firstNameLengthValidator,
  middleNamesLengthValidator: fields.middleNamesLengthValidator,
  dvlaValidator: fields.dvlaValidator,
  surname: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [43] },
      { type: "regexSurname", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      {
        type: "surNameLength",
        ...surnameLengthValidatorObj
      }
    ],
    journeyKey: "surname"
  },
  firstName: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [38] },
      { type: "regexFirstName", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      {
        type: "firstNameLength",
        ...firstNameLengthValidatorObj
      },
      {
        type: "firstNameMiddleNameLength",
        ...firstNameMiddleNameLengthValidatorObj
      }
    ],
    journeyKey: "firstName"
  },
  middleNames: {
    type: "text",
    journeyKey: "middleNames",
    validate: [
      { type: "maxlength", arguments: [38] },
      {
        type: "regexMiddleNames",
        fn: (value) => value.match(/^[a-zA-Z .'-]*$/)
      },
      {
        type: "middleNamesLength",
        ...middleNamesLengthValidatorObj
      },
      {
        type: "firstNameMiddleNameLength",
        ...firstNameMiddleNameLengthValidatorObj
      }
    ]
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [] },
      {
        type: "dvlaChecker",
        ...dvlaValidatorObj
      }
    ],
    autocomplete: "bday",
    dependent: { field: "issuerDependent", value: "DVLA" }
  },
  dvaDateOfBirth: {
    type: "date",
    journeyKey: "dvaDateOfBirth",
    validate: ["required", "date", { type: "before", arguments: [] }],
    autocomplete: "bday",
    dependent: { field: "issuerDependent", value: "DVA" }
  },
  issueDate: {
    type: "date",
    journeyKey: "issueDate",
    validate: [
      "required",
      "date",
      {
        type: "before",
        arguments: []
      },
      {
        type: "beforeNow",
        fn: fields.beforeNow,
        arguments: [10, "years"]
      }
    ],
    autocomplete: "issueDate",
    dependent: { field: "issuerDependent", value: "DVLA" }
  },
  dateOfIssue: {
    type: "date",
    journeyKey: "dateOfIssue",
    validate: [
      "required",
      "date",
      {
        type: "before",
        arguments: []
      },
      {
        type: "beforeNow",
        fn: fields.beforeNow,
        arguments: [10, "years"]
      }
    ],
    autocomplete: "dateOfIssue",
    dependent: { field: "issuerDependent", value: "DVA" }
  },
  issuerDependent: {
    type: "hidden",
    label: "",
    legend: ""
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: [
      "required",
      "date",
      {
        type: "after",
        arguments: []
      }
    ],
    autocomplete: "expiryDate"
  },
  drivingLicenceNumber: {
    type: "text",
    journeyKey: "drivingLicenceNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [16] },
      {
        type: "regexSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z0-9]*$/)
      },
      {
        type: "regexDrivingLicence",
        fn: (value) =>
          value.match(
            /^(?=.{16}$)[A-Za-z]{1,5}9{0,4}[0-9](?:[05][1-9]|[16][0-2])(?:[0][1-9]|[12][0-9]|3[01])[0-9](?:99|[A-Za-z][A-Za-z9])(?![IOQYZioqyz01_])\w[A-Za-z]{2}$/
          )
      },
      {
        type: "dvlaChecker",
        ...dvlaValidatorObj
      }
    ],
    dependent: { field: "issuerDependent", value: "DVLA" },
    classes: "govuk-input--width-10"
  },
  dvaLicenceNumber: {
    type: "text",
    journeyKey: "dvaLicenceNumber",
    validate: [
      "required",
      {
        type: "regexSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z0-9]*$/)
      },
      { type: "numeric" },
      { type: "exactlength", arguments: [8] },
      { type: "regexDrivingLicence", fn: (value) => value.match(/^[0-9]{8}$/) }
    ],
    dependent: { field: "issuerDependent", value: "DVA" },
    classes: "govuk-input--width-10"
  },
  issueNumber: {
    type: "text",
    journeyKey: "issueNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [2] },
      {
        type: "regexSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z0-9]*$/)
      },
      { type: "numeric" }
      //{ type: "regexIssueNumber", fn: (value) => value.match(/^[0-9]{2}$/) }
    ],
    dependent: { field: "issuerDependent", value: "DVLA" },
    classes: "govuk-input--width-10"
  },
  postcode: {
    type: "text",
    journeyKey: "postcode",
    validate: [
      "required",
      { type: "maxlength", arguments: [8] },
      { type: "minlength", arguments: [5] },
      {
        type: "regexPostcodeSymbol",
        fn: (value) => value.match(/^[A-Za-z0-9 ]+$/)
      },
      { type: "regexPostcodeAlpha", fn: (value) => value.match(/[A-Za-z]+/) },
      { type: "regexPostcodeNumeric", fn: (value) => value.match(/[0-9]+/) },
      {
        type: "regexPostcodeUK",
        fn: (value) =>
          value.match(
            /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
          )
      }
    ],
    classes: "govuk-input--width-10"
  },
  consentDVACheckbox: {
    type: "text",
    journeyKey: "consentDVACheckbox",
    validate: ["required"],
    dependent: { field: "issuerDependent", value: "DVA" }
  },
  consentCheckbox: {
    type: "text",
    journeyKey: "consentCheckbox",
    validate: ["required"],
    dependent: { field: "issuerDependent", value: "DVLA" }
  },
  licenceIssuer: {
    type: "radios",
    label: "",
    legend: "",
    items: [
      { value: "DVLA" },
      { value: "DVA" },
      { divider: true, key: "fields.licenceIssuer.items.or.label" },
      { value: "noLicence" }
    ],
    validate: ["required"]
  }
};

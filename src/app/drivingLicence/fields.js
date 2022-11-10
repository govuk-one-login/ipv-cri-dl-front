const fields = require("./fieldsHelper");

const firstNameMiddleNameLengthValidatorObj = {
  fn: fields.firstNameMiddleNameLengthValidator,
  arguments: [30, "firstName", "middleNames"],
};

const dvlaValidatorObj = {
  fn: fields.dvlaValidator,
  arguments: ["dateOfBirth", "drivingLicenceNumber"]
};

module.exports = {
  firstNameMiddleNameLengthValidator: fields.firstNameMiddleNameLengthValidator,
  dvlaValidator: fields.dvlaValidator,
  surname: {
      type: "text",
      validate: [
        "required",
        { type: "maxlength", arguments: [30] },
        { type: "regexSurname", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      ],
      journeyKey: "surname",
    },
    firstName: {
      type: "text",
      validate: [
        "required",
        { type: "maxlength", arguments: [30] },
        { type: "regexFirstName", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
        {
          type: "firstNameMiddleNameLength",
          ...firstNameMiddleNameLengthValidatorObj,
        },
      ],
      journeyKey: "firstName",
    },
    middleNames: {
      type: "text",
      journeyKey: "middleNames",
      validate: [
        { type: "maxlength", arguments: [30] },
        { type: "regexMiddleNames", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
        {
          type: "firstNameMiddleNameLength",
          ...firstNameMiddleNameLengthValidatorObj,
        },
      ],
    },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] },
      {
        type: "dvlaChecker",
        ...dvlaValidatorObj,
      }
    ],
    dependent: {field: "dvlaDependent", value: "DVLA"}
  },
  dvaDateOfBirth: {
       type: "date",
       journeyKey: "dvaDateOfBirth",
       validate: [
         "required",
         "date",
         { type: "before", arguments: [new Date().toISOString().split("T")[0]] }
       ],
       dependent: {field: "dvaDependent", value: "DVA"}
     },
  issueDate: {
    type: "date",
    journeyKey: "issueDate",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
            .toISOString()
            .split("T")[0],
        ] }
    ],
    dependent: {field: "dvlaDependent", value: "DVLA"}
  },
  dateOfIssue: {
    type: "date",
    journeyKey: "dateOfIssue",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
            .toISOString()
            .split("T")[0],
        ] }
    ],
    dependent: {field: "dvaDependent", value: "DVA"}
  },
  dvlaDependent: {
     type: "hidden",
     label: "",
     legend: "",
     default: "DVLA"
  },
  dvaDependent: {
     type: "hidden",
     label: "",
     legend: "",
     default: "DVA"
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: [
      "required",
      "date",
      { type: "after", arguments: [
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
            .toISOString()
            .split("T")[0],
        ] }
    ],
  },
  drivingLicenceNumber: {
    type: "text",
    journeyKey: "drivingLicenceNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [16] },
      { type: "regexSpecialCharacters", fn: (value) => value.match(/^[A-Za-z0-9]*$/) },
      { type: "regexDrivingLicence", fn: (value) => value.match(/^[A-Za-z]{1,5}9{0,4}[0-9]{6}[A-Za-z]{2}[A-Za-z0-9]{3}$/) },
      {
        type: "dvlaChecker",
        ...dvlaValidatorObj,
      }
    ],
    dependent: {field: "dvlaDependent", value: "DVLA"},
    classes: "govuk-input--width-10",
  },
  dvaLicenceNumber: {
    type: "text",
    journeyKey: "dvaLicenceNumber",
    validate: [
      "required",
      { type: "numeric"},
      { type: "exactlength", arguments: [8] },
      { type: "regexDrivingLicence", fn: (value) => value.match(/^[0-9]{8}$/) }
    ],
    dependent: {field: "dvaDependent", value: "DVA"},
    classes: "govuk-input--width-10",
  },
  issueNumber: {
    type: "text",
    journeyKey: "issueNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [2] },
      { type: "regexIssueNumber", fn: (value) => value.match(/^[0-9]{2}$/) }
    ],
    dependent: {field: "dvlaDependent", value: "DVLA"},
    classes: "govuk-input--width-10",
  },
  postcode: {
    type: "text",
    journeyKey: "postcode",
    validate: [
      "required",
      { type: "maxlength", arguments: [8] },
      { type: "minlength", arguments: [5] },
      { type: "regexPostcodeAlpha", fn: (value) => value.match(/^[A-Za-z0-9 ]*$/) },
      { type: "regexPostcodeUK", fn: (value) => value.match(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/) }
    ],
    classes: "govuk-input--width-10",
  },
  proveAnotherWayRadio: {
    type: "radios",
    items: ["proveAnotherWay", "retry"],
    validate: ["required"],
  },
    licenceIssuerRadio: {
      type: "radios",
      label: "",
      legend: "",
      items: [{value:"DVLA"}, {value:"DVA"}, {divider: "Or"}, {value:"noLicence"}],
      validate: ["required"],
    },
};

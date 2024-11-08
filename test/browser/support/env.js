const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const users = {
  "Authenticatable Anita": {},
  "DL Auth Source Kenneth": {},
  "Erroring Ethem": {},
  "Not Authenticatable Neil": {},
  "Validating Valerie": {}
};

class CustomWorld {
  constructor() {
    this.allUsers = users;
  }
}

setWorldConstructor(CustomWorld);

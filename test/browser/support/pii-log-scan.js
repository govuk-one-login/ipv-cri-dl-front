const { BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { collectFromAllTestUsers } = require("../util/pii-terms-collector");
const { scanForTerm } = require("../util/cloudwatch-log-service");

const LOG_GROUPS = ["ECSAccessLogsGroup", "APIGWAccessLogsGroup"];

let suiteStartTime;

BeforeAll(function () {
  suiteStartTime = new Date();
});

AfterAll(async function () {
  const stackName = process.env.SAM_STACK_NAME;
  if (!stackName) {
    console.log("Skipping PII log scan — SAM_STACK_NAME not set");
    return;
  }

  const piiTerms = collectFromAllTestUsers();
  console.log(
    `PII scan: checking ${piiTerms.size} terms across ${LOG_GROUPS.length} log groups`
  );

  const violations = [];

  for (const logGroup of LOG_GROUPS) {
    for (const term of piiTerms) {
      const matches = await scanForTerm(logGroup, term, suiteStartTime);
      if (matches.length > 0) {
        console.error(
          `PII DETECTED in '${logGroup}': term '${term}' found in ${matches.length} log event(s)`
        );
        matches.forEach((match) => console.error(`  ${match}`));
        violations.push(`'${term}' found in ${logGroup}`);
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `PII detected in CloudWatch logs after test run: ${violations}`
    );
  }
});

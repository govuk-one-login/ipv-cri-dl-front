# Browser Tests

End-to-end tests for the Driving Licence CRI front end, using Playwright and Cucumber.

## Test Profiles

| Profile          | Command                        | Description                                              |
| ---------------- | ------------------------------ | -------------------------------------------------------- |
| `stub_tests`     | `npm run test:browser:stub:ci` | Runs against the IPV Core Stub in a deployed environment |
| `wiremock_tests` | `npm run test:browser:ci`      | Runs locally against a WireMock instance                 |

## Running Core Stub Tests

### Prerequisites

- AWS credentials configured for the target environment (e.g. `aws-vault exec <profile_name>`)
- `.env` file populated — use `.env.sample` as a reference

### Required `.env` variables

```
ENVIRONMENT=dev
CORE_STUB_URL=cri.core.stubs.account.gov.uk
CORE_STUB_USERNAME=<username>
CORE_STUB_PASSWORD=<password>
```

### Run

```bash
npm run test:browser:stub:ci
```

### Run a specific test

You can execute a specific test by adding --tags=@test (or any other tag) at the end of the test:browser or test:browser:stub script.
Add in the @test tag against the speicifc scenario you wish to execute, then execute the test as normal.

## PII Log Scan

The stub test profile includes an automated PII log scan that runs after all scenarios complete. It queries CloudWatch log groups for the deployed stack and asserts that no test user PII (names, licence numbers, postcodes, dates of birth) appears in the logs.

### Enabling the scan

Add `SAM_STACK_NAME` to your `.env`, set to the name of the deployed CloudFormation stack:

```
SAM_STACK_NAME=<DL Front Stack>
```

Your AWS credentials must have the following permissions on the target stack:

- `logs:FilterLogEvents`
- `cloudformation:DescribeStackResource`

### Skipping the scan

If `SAM_STACK_NAME` is not set the scan is skipped automatically and the tests complete as normal. This means local WireMock runs and stub runs without credentials are unaffected.

### Log groups scanned

The scan checks the following CloudFormation logical resource IDs:

- `ECSAccessLogsGroup`
- `APIGWAccessLogsGroup`

Log group names are resolved from the CloudFormation stack at runtime. They can also be overridden directly via environment variables if needed (e.g. `LOG_GROUP_ECSAccessLogsGroup=<log-group-name>`).

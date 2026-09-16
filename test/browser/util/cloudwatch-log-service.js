const {
  CloudWatchLogsClient,
  FilterLogEventsCommand
} = require("@aws-sdk/client-cloudwatch-logs");
const {
  CloudFormationClient,
  DescribeStackResourceCommand
} = require("@aws-sdk/client-cloudformation");

const region = "eu-west-2";
const logsClient = new CloudWatchLogsClient({ region });
const cfnClient = new CloudFormationClient({ region });

const resolveLogGroupName = async (logicalId) => {
  const envVar = `LOG_GROUP_${logicalId}`;
  if (process.env[envVar]) return process.env[envVar];

  const stackName = process.env.SAM_STACK_NAME;
  if (!stackName) {
    throw new Error(
      `Env var '${envVar}' not set — log group name could not be resolved for '${logicalId}'`
    );
  }

  const response = await cfnClient.send(
    new DescribeStackResourceCommand({
      StackName: stackName,
      LogicalResourceId: logicalId
    })
  );
  return response.StackResourceDetail.PhysicalResourceId;
};

const scanForTerm = async (logicalId, term, startTime) => {
  const logGroupName = await resolveLogGroupName(logicalId);
  try {
    const events = [];
    let nextToken;
    do {
      const response = await logsClient.send(
        new FilterLogEventsCommand({
          logGroupName,
          filterPattern: `"${term}"`,
          startTime: startTime.getTime(),
          nextToken
        })
      );
      events.push(...(response.events || []).map((e) => e.message));
      nextToken = response.nextToken;
    } while (nextToken);
    return events;
  } catch (err) {
    console.warn(
      `CloudWatch query failed for '${logGroupName}', term '${term}' — skipping: ${err.message}`
    );
    return [];
  }
};

module.exports = { scanForTerm };

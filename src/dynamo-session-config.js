import appConfig from "./lib/config.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import session from "express-session";
import connectDynamoDB from "connect-dynamodb";

const DynamoDBStore = connectDynamoDB(session);
const { SESSION_TABLE_NAME } = appConfig;

export const dynamoSessionConfig = {
  createSessionStore: () => {
    const dynamodbClient = new DynamoDBClient({
      region: "eu-west-2"
    });

    return new DynamoDBStore({
      client: dynamodbClient,
      table: SESSION_TABLE_NAME
    });
  }
};

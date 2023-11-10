import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { validateAsITask } from "../shared/Validator";
import { ITask } from "../models/ITask";
import { createRandomId, parseJSON } from "../shared/Utils";

export const createTask = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    const randomId = createRandomId();
    const item: ITask = parseJSON(event.body);

    validateAsITask(item);

    const dynamoDbDocumentClient = DynamoDBDocumentClient.from(ddbClient);
    
    await dynamoDbDocumentClient.send(new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            id: randomId,
            description: item.description,
            createdAt: Date.now(),
            lastUpdated: Date.now()
        }
    }));

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}
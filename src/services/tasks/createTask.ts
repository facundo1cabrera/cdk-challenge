import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid';

export const createTask = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    const randomId = v4();
    const item = JSON.parse(event.body);

    const dynamoDbDocumentClient = DynamoDBDocumentClient.from(ddbClient);
    
    await dynamoDbDocumentClient.send(new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            id: randomId,
            description: item.description
        }
    }));

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}
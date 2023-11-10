import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getTask = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    
    const dynamoDbDocumentClient = DynamoDBDocumentClient.from(ddbClient);

    const id = event.pathParameters['id'];

    const result = await dynamoDbDocumentClient.send(new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id }
    }));

    if (result.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        }
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify(`The Task with id ${id} was not found`)
        }
    }
}
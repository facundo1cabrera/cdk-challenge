import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const deleteTask = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    
    const dynamoDbDocumentClient = DynamoDBDocumentClient.from(ddbClient);

    const id = event.pathParameters['id'];

    await dynamoDbDocumentClient.send(new DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id }
    }));

    return {
        statusCode: 204,
        body: JSON.stringify(`Deleted task with id ${id}`)
    }
}
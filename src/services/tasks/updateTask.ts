import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const updateTask = async (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> => {
    
    const dynamoDbDocumentClient = DynamoDBDocumentClient.from(ddbClient);

    const id = event.pathParameters['id'];

    const getItemResult = await dynamoDbDocumentClient.send(new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id }
    }));

    if (!getItemResult.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify(`The Task with id ${id} was not found`)
        }
    }

    const parsedBody = JSON.parse(event.body)

    const requestBodyKey = Object.keys(parsedBody)[0];
    const requestBodyValue = parsedBody[requestBodyKey];

    const updateResult = await dynamoDbDocumentClient.send(new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set #attributeName = :newValue',
        ExpressionAttributeValues: {
            ':newValue': requestBodyValue
        },
        ExpressionAttributeNames: {
           '#attributeName': requestBodyKey 
        },
        ReturnValues: 'UPDATED_NEW'
    }));

    return {
        statusCode: 204,
        body: JSON.stringify(updateResult.Attributes)
    }
}
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IDbClient } from "./IDbClient";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { parseJSON } from "../shared/Utils";

export class DynamoDocumentClient implements IDbClient {
    private dynamoDbClient: DynamoDBClient;
    private dynamoDbDocumentClient: DynamoDBDocumentClient;
    private tableName: string;

    constructor() {
        this.dynamoDbClient = new DynamoDBClient({});
        this.dynamoDbDocumentClient = DynamoDBDocumentClient.from(this.dynamoDbClient);
        this.tableName = process.env.DYNAMO_TABLE_NAME;
    }
    getAll() {
        throw new Error("Method not implemented.");
    }


    async create(item: any) {
        await this.dynamoDbDocumentClient.send(new PutCommand({
            TableName: this.tableName,
            Item: item
        }));
    }

    async getById(id: string) {
        const getResult = await this.dynamoDbDocumentClient.send(new ScanCommand({
            TableName: this.tableName,
            FilterExpression: 'taskId = :id',
            ExpressionAttributeValues: {
                ':id': id
            }
        }));
        return getResult;
    }

    async deleteById(id: string) {
        await this.dynamoDbDocumentClient.send(new DeleteCommand({
            TableName: this.tableName,
            Key: { id }
        }));
    }
    async update(id: string, body: any) {

        const parsedBody = parseJSON(body)

        const requestBodyKey = Object.keys(parsedBody)[0];
        const requestBodyValue = parsedBody[requestBodyKey];

        const updateResult = await this.dynamoDbDocumentClient.send(new UpdateCommand({
            TableName: this.tableName,
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

        return updateResult;
    }

}
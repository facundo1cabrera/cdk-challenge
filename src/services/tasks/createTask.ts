import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { validateAsITask } from "../shared/Validator";
import { ITask } from "../models/ITask";
import { createRandomId, parseJSON } from "../shared/Utils";
import { IDbClient } from "../DataLayer/IDbClient";

export const createTask = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    const item: ITask = parseJSON(event.body);

    validateAsITask(item);
    
    await ddbClient.create({
        description: item.description,
        status: item.status,
        createdAt: new Date().toLocaleDateString('en-US'),
        lastUpdated: new Date().toLocaleDateString('en-US')
    })

    return {
        statusCode: 201,
        body: JSON.stringify({})
    }
}
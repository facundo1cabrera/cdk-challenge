import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { validateAsITask } from "../shared/Validator";
import { ITask } from "../models/ITask";
import { createRandomId, parseJSON } from "../shared/Utils";
import { IDbClient } from "../DataLayer/IDbClient";

export const createTask = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    const randomId = createRandomId();
    const item: ITask = parseJSON(event.body);

    validateAsITask(item);
    
    await ddbClient.create({
        id: randomId,
        description: item.description,
        createdAt: Date.now(),
        lastUpdated: Date.now()
    })

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}
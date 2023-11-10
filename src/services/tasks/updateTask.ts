import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IDbClient } from "../DataLayer/IDbClient";
import { parseJSON } from "../shared/Utils";
import { validateAsITask } from "../shared/Validator";

export const updateTask = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    
    const id = event.pathParameters['id'];

    const getItemResult = await ddbClient.getOneById(id);

    if (!getItemResult.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify(`The Task with id ${id} was not found`)
        }
    }

    const item = parseJSON(event.body);

    validateAsITask(item);

    const updateResult = await ddbClient.update(id, {
        status: item.status,
        description: item.description,
        lastUpdated: new Date().toLocaleDateString('en-US')
    });

    return {
        statusCode: 204,
        body: JSON.stringify(updateResult.Attributes)
    }
}
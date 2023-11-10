import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IDbClient } from "../DataLayer/IDbClient";

export const updateTask = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    
    const id = event.pathParameters['id'];

    const getItemResult = await ddbClient.getOneById(id);

    if (!getItemResult.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify(`The Task with id ${id} was not found`)
        }
    }

    const updateResult = await ddbClient.update(id, event.body);

    return {
        statusCode: 204,
        body: JSON.stringify(updateResult.Attributes)
    }
}
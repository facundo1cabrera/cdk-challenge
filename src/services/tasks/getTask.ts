import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IDbClient } from "../DataLayer/IDbClient";

export const getTask = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    
    const id = event.pathParameters['id'];

    const result = await ddbClient.getById(id);

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
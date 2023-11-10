import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IDbClient } from "../DataLayer/IDbClient";

export const deleteTask = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    
    const id = event.pathParameters['id'];

    await ddbClient.deleteById(id);

    return {
        statusCode: 204,
        body: JSON.stringify(`Deleted task with id ${id}`)
    }
}
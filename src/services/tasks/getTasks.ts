import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IDbClient } from "../DataLayer/IDbClient";

export const getTasks = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    
    const result = await ddbClient.getAll();

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }

}
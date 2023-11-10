import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { validateAsIComment } from "../shared/Validator";
import { createRandomId, parseJSON } from "../shared/Utils";
import { IDbClient } from "../DataLayer/IDbClient";
import { IComment } from "../models/IComment";

export const createComment = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    const randomId = createRandomId();
    const item: IComment = parseJSON(event.body);

    validateAsIComment(item);
    
    await ddbClient.create({
        id: randomId,
        taskId: item.taskId,
        content: item.content,
        createdAt: new Date().toLocaleDateString('en-US'),
        lastUpdated: new Date().toLocaleDateString('en-US')
    })

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}
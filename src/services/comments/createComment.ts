import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { validateAsIComment } from "../shared/Validator";
import { createRandomId, parseJSON } from "../shared/Utils";
import { IDbClient } from "../DataLayer/IDbClient";
import { IComment } from "../models/IComment";

export const createComment = async (event: APIGatewayProxyEvent, ddbClient: IDbClient): Promise<APIGatewayProxyResult> => {
    const randomId = createRandomId();
    const item: IComment = parseJSON(event.body);

    // TODO: validate this once the rds table is ok
    // const getResult = await ddbClient.getOneById(item.taskId);

    // if (!getResult.Item) {
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify(`The comment could not be created. The taskId: ${item.taskId} is not correct`)
    //     }
    // }

    validateAsIComment(item);
    
    await ddbClient.create({
        id: randomId,
        taskId: item.taskId,
        content: item.content,
        createdAt: Date.now(),
        lastUpdated: Date.now()
    })

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}
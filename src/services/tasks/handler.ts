import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult =  {
        statusCode: 200,
        body: JSON.stringify({ message: `test ${process.env.TABLE_NAME}` })
      };    
    return response;
}

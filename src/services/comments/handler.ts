import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createComment } from './createComment';
import { getComments } from './getComments';
import { IncorrectTypeError, JSONError, MissingFieldError } from '../shared/Validator';
import { DynamoDocumentClient } from '../DataLayer/DynamoDocumentClient';

const dbClient = new DynamoDocumentClient();

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    
    switch (event.httpMethod) {
      case 'GET':  
        const getResponse = getComments(event, dbClient);
        return getResponse;
      case 'POST':
        const postResponse = await createComment(event, dbClient);
        return postResponse;
    }

  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }
    if (error instanceof IncorrectTypeError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }
    if (error instanceof JSONError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ errorMessage: error.message })
    }
  }
  
}

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createTask } from './createTask';
import { getTask } from './getTask';
import { updateTask } from './updateTask';
import { deleteTask } from './deleteTask';

const dbClient = new DynamoDBClient({});


export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    
    switch (event.httpMethod) {
      case 'GET':  
        const getResponse = getTask(event, dbClient);
        return getResponse;
      case 'POST':
        const postResponse = await createTask(event, dbClient);
        return postResponse;
      case 'PUT':
        const updateResponse = await updateTask(event, dbClient);
        return updateResponse;
      case 'DELETE':
        const deleteResponse = await deleteTask(event, dbClient);
        return deleteResponse;
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ errorMessage: error.message, test: 'this is the message updated' })
    }
  }
  
}

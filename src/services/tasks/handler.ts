import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createTask } from './createTask';
import { getTask } from './getTask';
import { updateTask } from './updateTask';
import { deleteTask } from './deleteTask';
import { IncorrectTypeError, JSONError, MissingFieldError } from '../shared/Validator';
import { TasksPgClient } from '../DataLayer/TasksPgClient';
import * as dotenv from 'dotenv';
import { getTasks } from './getTasks';

dotenv.config();

const dbClient = new TasksPgClient();

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.httpMethod) {
      case 'GET':  
        const id = event.pathParameters ? event.pathParameters['id'] : null;
        if (id) {
          const getResponse = await getTask(event, dbClient);
          return getResponse;
        }
        const getAllResponse = await getTasks(event, dbClient);
        return getAllResponse;
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

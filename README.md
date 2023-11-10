# Serverless API Challenge

## Objective
The objective of this challenge is to build a Serverless API using AWS Lambda, TypeScript, and a combination of SQL and NoSQL databases. The API will perform basic CRUD operations for Tasks.

## Requirements
Backend Technologies:
AWS Lambda: Utilize AWS Lambda for the serverless backend.

TypeScript: Implement the API using TypeScript for enhanced code readability and maintainability.

Amazon API Gateway: Expose the API through Amazon API Gateway to manage endpoints.

SQL and NoSQL Databases: Use two databases - one SQL (e.g., Amazon RDS) to store task metadata, and one NoSQL (e.g., Amazon DynamoDB) to store task comments.

Validation and Error Handling: Implement appropriate validation for input data and error handling to ensure a robust API.

## Endpoints for Managing Tasks:
Base url: https://029aj3jmpb.execute-api.us-east-1.amazonaws.com/prod/

- GET /tasks: Retrieve a list of all tasks.
  
  `[
    {
      id: string
      description: string
      status: string
      createdAt: Date
      lastUpdated: Date
    }
  ]`
- GET /tasks/{taskId}: Retrieve a single task by ID.

  `
  {
    id: string
    description: string
    status: string
    createdAt: Date
    lastUpdated: Date
  }
  `
- POST /tasks: Create a new task.

  `{
    description: string
    status: TaskStatus
  }`
- PUT /tasks/{taskId}: Update an existing task.

  `{
    description: string
    status: TaskStatus
  }`
- DELETE /tasks/{taskId}: Delete a task.
- POST /tasks/{taskId}/comments: Add a comment to a task (stored in NoSQL).

  `{
    taskId: string
    content: string
  }`

- GET /tasks/{taskId}/comments: Retrieve comments for a task.

  `
  [
    {
    id: string
    taskId: string
    content: string
    createdAt: Date
    lastUpdated: Date
    }
  ]
  `

## Api Desing
I have opted to simplify the API design by using only two Lambda functions, with each function responsible for handling all HTTP methods.
The architecture involves an ApiGateway routing Tasks-related requests to one Lambda function and Comments-related requests to another Lambda.

The TasksLambda uses a PostgresDb for data persistance, and the CommentsLambda uses DynamoDb table.

The entire API has been deployed to the AWS Cloud using the AWS CDK, except for the PostgresDB, which is hosted on Railway.

Both Lambdas rely on an interface named `IDbClient`, encompassing common CRUD operation methods.
This strategic use of an interface allows for the separation of Lambda business logic code from the data persistance logic and it makes using different Db much easier.
However, there are still improvements to be made concerning the abstraction of this interface, specifically regarding the adoption of a more standardized response format.
![image](https://github.com/facundo1cabrera/cdk-challenge/assets/83284235/5351f0f7-14bc-435c-902b-18facca4cdfb)

## Tests
I have developed some unit tests about the lambda code (mocking the Data Layer responses) in order to assure the right behavior regarding Error Handling, Model Validation and Lambda responses.
You can run this tests with the following commands.
Make sure you have Node 18 in your computer.
`npm install`
`npm run test`

## Pending upgrades
**Postman Collection:** Develop a Postman collection to improve the testing experience for others interacting with the production API.

**Test Coverage:** Complete the unit tests and incorporate integration tests to ensure robust code coverage.

**RDS Stack Integration:** Create an RDS stack and integrate it instead of using the PostgreSQL DB from Railway, enhancing the overall database setup.

**Refined Data Layer Architecture:** Separate the DataLayer from two extensive DbClients into two DbClients and distinct repositories for each specific Entity. This would lead to a more modular and maintainable data layer architecture.

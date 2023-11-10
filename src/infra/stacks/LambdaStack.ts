import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

interface LambdaStackProps extends StackProps {
    commentsTable: ITable; 
}


export class LambdaStack extends Stack {
    public readonly tasksLambdaIntegration: LambdaIntegration;
    public readonly commentsLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const commentsLambda = new NodejsFunction(this, 'CommentsLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: join(__dirname, '..', '..', 'services', 'comments', 'handler.ts'),
            environment: {
                DYNAMO_TABLE_NAME: props.commentsTable.tableName
            }
        });

        const tasksLambda = new NodejsFunction(this, 'TasksLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: join(__dirname, '..', '..', 'services', 'tasks', 'handler.ts'),
            environment: {
                SQLDB_HOST: process.env.SQLDB_HOST,
                SQLDB_USER: process.env.SQLDB_USER,
                SQLDB_PORT: process.env.SQLDB_PORT,
                SQLDB_PASSWORD: process.env.SQLDB_PASSWORD,
                SQLDB_DATABASE: process.env.SQLDB_DATABASE
            }
        });

        commentsLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.commentsTable.tableArn],
            actions: [
                'dynamodb:PutItem',
                'dynamodb:GetItem',
                'dynamodb:DeleteItem',
                'dynamodb:Scan'
            ]
        }));

        this.tasksLambdaIntegration = new LambdaIntegration(tasksLambda);
        this.commentsLambdaIntegration = new LambdaIntegration(commentsLambda);
    }
}
import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    commentsTable: ITable; 
}


export class LambdaStack extends Stack {
    public readonly tasksLambdaIntegration: LambdaIntegration;

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

        commentsLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.commentsTable.tableArn],
            actions: [
                'dynamodb:PutItem',
                'dynamodb:GetItem',
                'dynamodb:DeleteItem'
            ]
        }));

        this.tasksLambdaIntegration = new LambdaIntegration(commentsLambda);
    }
}
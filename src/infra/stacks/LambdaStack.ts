import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    tasksTable: ITable; 
}


export class LambdaStack extends Stack {
    public readonly getTaskLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const getTaskLambda = new NodejsFunction(this, 'GetTaskLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: join(__dirname, '..', '..', 'services', 'tasks', 'handler.ts'),
            environment: {
                TABLE_NAME: props.tasksTable.tableName
            }
        });

        this.getTaskLambdaIntegration = new LambdaIntegration(getTaskLambda);
    }
}
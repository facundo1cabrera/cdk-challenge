import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    tasksTable: ITable; 
}


export class LambdaStack extends Stack {
    public readonly getTaskLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const getTaskLambda = new LambdaFunction(this, 'GetTaskLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'getTask.main',
            code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
            environment: {
                TABLE_NAME: props.tasksTable.tableName
            }
        });

        this.getTaskLambdaIntegration = new LambdaIntegration(getTaskLambda);
    }
}
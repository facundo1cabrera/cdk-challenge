import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiGatewayStackProps extends StackProps {
    getTaskLambdaIntegration: LambdaIntegration;
}

export class ApiGatewayStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'TasksApi');
        const tasksResource = api.root.addResource('tasks');
        tasksResource.addMethod('GET', props.getTaskLambdaIntegration);
    }
}
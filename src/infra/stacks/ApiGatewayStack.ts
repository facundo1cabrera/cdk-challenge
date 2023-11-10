import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiGatewayStackProps extends StackProps {
    tasksLambdaIntegration: LambdaIntegration;
    commentsLambdaIntegration: LambdaIntegration;
}

export class ApiGatewayStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'TasksApi');
        const tasksResource = api.root.addResource('tasks');
        const tasksResourceWithIdParam = tasksResource.addResource('{id}');
        tasksResourceWithIdParam.addMethod('GET', props.tasksLambdaIntegration);
        tasksResourceWithIdParam.addMethod('PUT', props.tasksLambdaIntegration);
        tasksResourceWithIdParam.addMethod('DELETE', props.tasksLambdaIntegration);
        tasksResource.addMethod('POST', props.tasksLambdaIntegration);
        const commentsResource = tasksResourceWithIdParam.addResource('comments');
        commentsResource.addMethod('GET', props.commentsLambdaIntegration);
        commentsResource.addMethod('POST', props.commentsLambdaIntegration);
    }
}
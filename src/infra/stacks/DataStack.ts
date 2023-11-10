import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table as DynamoTable } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Utils';

export class DataStack extends Stack {
    public readonly commentsTable: ITable;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        this.commentsTable = new DynamoTable(this, 'CommentsTable', {
            partitionKey: {
                name: 'id',
                type: AttributeType.STRING,
            },
            sortKey: {
                name: 'taskId',
                type: AttributeType.STRING
            },
            tableName: `TasksTable-${suffix}`
        });
    }
}
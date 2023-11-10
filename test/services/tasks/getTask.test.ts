import { IDbClient } from "../../../src/services/DataLayer/IDbClient";
import { getTask } from "../../../src/services/tasks/getTask";

class DynamoDbClientMock implements IDbClient {
    create(item: any) {
        throw new Error("Method not implemented.");
    }
    async getById(id: string) {
        return {
            Item: {
                id: 'random-id',
                description: 'dummy description',
                status: 'InProgress',
                createdAt: '2023-11-10',
                lastUpdated: '2023-11-10'
            }
        }
    }
    deleteById(id: string) {
        throw new Error("Method not implemented.");
    }
    update(id: string, body: any) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        throw new Error("Method not implemented.");
    }

}

describe('Get Task test suite', () => {

    test('Returns task from dbClient', async () => {
        const result = await getTask({
            pathParameters: {
                id: '1'
            }
        } as any, new DynamoDbClientMock());

        expect(result.statusCode).toBe(200);
        const expectedResult = {
            id: 'random-id',
            description: 'dummy description',
            status: 'InProgress',
            createdAt: '2023-11-10',
            lastUpdated: '2023-11-10'
        };
        const parsedResultBody = JSON.parse(result.body);
        expect(parsedResultBody).toEqual(expectedResult);
    });
})
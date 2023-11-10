import { IDbClient } from "../../../src/services/DataLayer/IDbClient";
import { getComments } from "../../../src/services/comments/getComments";

class DynamoDbClientMock implements IDbClient {
    create(item: any) {
        throw new Error("Method not implemented.");
    }
    async getById(id: string) {
        return {
            Items: [
                {
                    id: 'random-id',
                    taskId: '1',
                    content: 'test content of a comment',
                    createdAt: '2023-11-10',
                    lastUpdated: '2023-11-10'
                }
            ]
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

describe('Get Comments test suite', () => {

    test('Returns comments from dbClient', async () => {
        const result = await getComments({
            pathParameters: {
                id: '1'
            }
        } as any, new DynamoDbClientMock());

        expect(result.statusCode).toBe(200);
        const expectedResult = [
            {
                id: 'random-id',
                taskId: '1',
                content: 'test content of a comment',
                createdAt: '2023-11-10',
                lastUpdated: '2023-11-10'
            }
        ];
        const parsedResultBody = JSON.parse(result.body);
        expect(parsedResultBody).toEqual(expectedResult);
    });
})
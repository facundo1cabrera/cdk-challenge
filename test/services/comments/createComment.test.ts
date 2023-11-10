import { IDbClient } from "../../../src/services/DataLayer/IDbClient";
import { createComment } from "../../../src/services/comments/createComment";
import { MissingFieldError } from "../../../src/services/shared/Validator";

class DynamoDbClientMock implements IDbClient {
    getById(id: string) {
        throw new Error("Method not implemented.");
    }
    async create(item: any) {
        return;
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

describe('Create Comments test suite', () => {

    test('should return 201 status code', async () => {
        const result = await createComment({
            body: JSON.stringify({
                content: 'dummy content',
                taskId: 'dummy TaskId'
            })
        } as any, new DynamoDbClientMock());

        expect(result.statusCode).toBe(201);
    });

    test('should throw MissingFieldError if body is invalid', async () => {
        await expect(createComment({
            body: JSON.stringify({})
        } as any, new DynamoDbClientMock())).rejects.toThrow(new MissingFieldError('content', ''));
    });
})
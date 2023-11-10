import { IDbClient } from "../../../src/services/DataLayer/IDbClient";
import { createTask } from "../../../src/services/tasks/createTask";
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

describe('Create Task test suite', () => {

    test('should return 201 status code', async () => {
        const result = await createTask({
            body: JSON.stringify({
                description: 'dummy content',
                status: 'InProgress'
            })
        } as any, new DynamoDbClientMock());

        expect(result.statusCode).toBe(201);
    });

    test('should throw MissingFieldError if body is invalid', async () => {
        await expect(createTask({
            body: JSON.stringify({})
        } as any, new DynamoDbClientMock())).rejects.toThrow(new MissingFieldError('description', ''));
    });
})
import { JSONError } from "./Validator";
import { randomUUID } from 'crypto';

export const createRandomId = (): string => {
    return randomUUID();
}

export const parseJSON = (arg: string) => {
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JSONError(error.message);
    }

}
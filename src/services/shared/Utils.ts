import { JSONError } from "./Validator";

export const parseJSON = (arg: string) => {
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JSONError(error.message);
    }

}
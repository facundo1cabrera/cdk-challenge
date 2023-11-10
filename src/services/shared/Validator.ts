import { ITask, TaskStatus } from "../models/ITask"


export class MissingFieldError extends Error {
    constructor(missingField: string, type: string) {
        super(`A value for ${missingField} in ${type} is expected.`);
    }
}

export class IncorrectTypeError extends Error {
    constructor(fieldName: string, argValue: string, allowedValues: string, type ) {
        super(`The value ${argValue} is not correct. The value for ${fieldName} should be ${allowedValues} in ${type}.`);
    }
}

export const validateAsITask = (arg: any) => {
    if ((arg as ITask).description === undefined) {
        throw new MissingFieldError('description', 'ITask');
    }
    if ((arg as ITask).status === undefined || Object.values(TaskStatus).includes((arg as ITask).status)) {
        throw new IncorrectTypeError('status', (arg as ITask).status.toString(), TaskStatus.toString() ,'ITask');
    }

}
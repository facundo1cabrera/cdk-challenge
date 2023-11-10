import { IComment } from "../models/IComment";
import { ITask } from "../models/ITask"


export class MissingFieldError extends Error {
    constructor(missingField: string, type: string) {
        super(`The ${missingField} is a required field.`);
    }
}

export class JSONError extends Error {}

export class BadRequestError extends Error {}

export class IncorrectTypeError extends Error {
    constructor(fieldName: string, argValue: string, allowedValues: string[], type ) {
        super(`The value ${argValue} is not correct. The value for ${fieldName} should be ${allowedValues.toString()} in ${type}.`);
    }
}

export const validateAsITask = (arg: any) => {
    if ((arg as ITask).description === undefined) {
        throw new MissingFieldError('description', 'Task');
    }

    const allowedValues = ['Backlog', 'InProgress', 'Testing', 'Finished'];

    if ((arg as ITask).status === undefined || !(allowedValues.includes((arg as ITask).status))){
        throw new IncorrectTypeError('status', (arg as ITask).status, allowedValues, 'Task');
    }
}

export const validateAsIComment = (arg: any) => {
    if ((arg as IComment).content === undefined) {
        throw new MissingFieldError('content', 'Comment');
    }
    if ((arg as IComment).taskId === undefined) {
        throw new MissingFieldError('taskId', 'Comment');
    }
}
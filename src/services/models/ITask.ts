export interface ITask {
    id: string,
    description: string,
    status: TaskStatus,
    createdAt: Date,
    lastUpdated: Date
}

export enum TaskStatus {
    Backlog,
    InProgress,
    Testing,
    Finished
}
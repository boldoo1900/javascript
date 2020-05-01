export type Task = {
    id: number | null,
    title: string;
    description?: string;
    dueDateTime?: Date;
    creationDateTime?: Date;
};
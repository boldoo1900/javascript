export type Task = {
    title: string;
    description?: string;
    dueDateTime?: Date;
    creationDateTime?: Date;
};
  
export type SResponse = {
    result: boolean;
}
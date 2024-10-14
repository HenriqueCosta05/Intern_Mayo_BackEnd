import { Task } from "@prisma/client";


export interface TaskRepository {
    create(task: Task): Promise<Task>;
    findOne(id: string): Promise<Task>;
    findAll(): Promise<Task[]>;
    update(id: string, task: Task): Promise<Task>;
    delete(id: string): Promise<Task>;
    }
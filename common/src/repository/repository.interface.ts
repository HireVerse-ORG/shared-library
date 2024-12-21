import { DeepPartial } from "typeorm";

export interface IRepository<T> {
    create(data: Partial<T> | DeepPartial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findAll(filter: any, options: any): Promise<T[]>;
}

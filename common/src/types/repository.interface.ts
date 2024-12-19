export interface IRepository<T> {
    create(data: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findAll(filter: any, options: any): Promise<T[]>;
}

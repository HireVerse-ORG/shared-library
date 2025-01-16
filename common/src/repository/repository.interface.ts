import { FilterQuery, QueryOptions } from 'mongoose';
import { DeepPartial, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { ObjectLiteral } from 'typeorm';


export interface IRepository<T> {
    create(data: Partial<T> | DeepPartial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findAll(filter: any, options?: any): Promise<T[]>;
    findOne(filter: any, options?: any): Promise<T | null>;
}

export interface IPaginationResponse<T> {
    data: T[];
    total: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}


export interface IMongoRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findById(id: string, select?: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findAll(filter: FilterQuery<T>, options?: QueryOptions, select?: string): Promise<T[]>;
    findOne(filter: FilterQuery<T>, options?: QueryOptions, select?: string): Promise<T | null>;
    paginate(
        filter: FilterQuery<T>,
        page: number,
        limit: number,
        options?: QueryOptions,
        select?: string
    ): Promise<IPaginationResponse<T>>;
}

export interface IPostgresRepository<T extends ObjectLiteral> {
    create(data: DeepPartial<T>): Promise<T>;
    update(criteria: string | number | FindOptionsWhere<T>, data: Partial<T>): Promise<T | null>;
    delete(criteria: string | number | FindOptionsWhere<T>): Promise<boolean>;
    findAll(filter: FindManyOptions<T>): Promise<T[]>;
    findOne(filter: FindManyOptions<T>): Promise<T | null>;
    paginate(
        filter: FindManyOptions<T>,
        page: number,
        limit: number
    ): Promise<IPaginationResponse<T>>;
}

import { Model, Document, FilterQuery, QueryOptions } from 'mongoose';
import { IRepository } from './repository.interface';
import { InternalError } from '../app.errors';

export class MongoBaseRepository<T extends Document> implements IRepository<T> {
  protected repository: Model<T>;

  constructor(repository: Model<T>) {
    this.repository = repository;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const entity = new this.repository(data);
      return await entity.save();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.repository.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.repository.findByIdAndDelete(id).exec();
      return result !== null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    try {
      return await this.repository.find(filter, null, options) as unknown as T[];
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T | null> {
    try {
      return await this.repository.findOne(filter, null, options);
    } catch (error) {
      this.handleError(error);
    }
  }

  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      throw new InternalError(error.message);
    }
    throw new InternalError('An unknown error occurred');
  }
}

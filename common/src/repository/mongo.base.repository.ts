import { Model, Document, FilterQuery, QueryOptions } from 'mongoose';
import { IRepository } from './repository.interface';
import { InternalError } from '../app.errors';

export class MongoBaseRepository<T extends Document> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: T): Promise<T> {
    try {
      const entity = new this.model(data);
      return await entity.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalError(error.message);
      }
      throw new InternalError('An unknown error occurred');
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalError(error.message);
      }
      throw new InternalError('An unknown error occurred');
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalError(error.message);
      }
      throw new InternalError('An unknown error occurred');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(id).exec();
      return result !== null;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalError(error.message);
      }
      throw new InternalError('An unknown error occurred');
    }
  }

  async findAll(filter: FilterQuery<T> = {}, options: QueryOptions= {}): Promise<T[]> {
    try {
      return await this.model.find(filter, null, options) as unknown as T[];
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalError(error.message);
      }
      throw new InternalError('An unknown error occurred');
    }
  }
}

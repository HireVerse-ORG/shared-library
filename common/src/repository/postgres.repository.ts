import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { IRepository } from './repository.interface';
import { InternalError } from '../app.errors';

export class PostgresBaseRepository<T extends ObjectLiteral> implements IRepository<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(data);
      return await this.repository.save(entity);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.repository.findOne({ where: { id } as any });
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      await this.repository.update(id, data);
      return await this.findById(id);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.repository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(filter: FindManyOptions<T>): Promise<T[]> {
    try {
      return await this.repository.find(filter);
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

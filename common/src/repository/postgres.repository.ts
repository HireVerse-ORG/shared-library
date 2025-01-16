import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { IPaginationResponse, IPostgresRepository } from './repository.interface';
import { InternalError } from '../app.errors';

export class PostgresBaseRepository<T extends ObjectLiteral> implements IPostgresRepository<T> {
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

  async update(criteria: string | number | FindOptionsWhere<T>, data: Partial<T>): Promise<T | null> {
    try {
      const result = await this.repository.update(criteria, data);
      return result.affected ? result.raw : null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(criteria: string | number | FindOptionsWhere<T>): Promise<boolean> {
    try {
      const result = await this.repository.delete(criteria);
      return result.affected !== 0;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(filter: FindManyOptions<T> = {}): Promise<T[]> {
    try {
      return await this.repository.find(filter);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(filter: FindOneOptions<T> = {}): Promise<T | null> {
    try {
      return await this.repository.findOne(filter);
    } catch (error) {
      this.handleError(error);
    }
  }

  async paginate(
    filter: FindManyOptions<T> = {},
    page: number = 1,
    limit: number = 10
  ): Promise<IPaginationResponse<T>> {
    try {
      if (page < 1) page = 1;
      if (limit < 1) limit = 1;

      const [data, total] = await this.repository.findAndCount({
        where: filter.where,
        skip: (page - 1) * limit,
        take: limit,
      });

      const totalPages = Math.ceil(total / limit);

      const hasPreviousPage = page > 1;
      const hasNextPage = page < totalPages;

      return {
        data,
        total,
        limit,
        currentPage: page,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      };
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

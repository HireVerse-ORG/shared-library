import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { IPaginationResponse, IPostgresRepository, IRepository } from './repository.interface';
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

  async findById(id: string, select?: string[]): Promise<T | null> {
    try {
      const queryBuilder = this.repository.createQueryBuilder();
      if (select) {
        queryBuilder.select(select as string[]);
      }
      return await queryBuilder.where({ id } as any).getOne();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(filter: FindManyOptions<T> = {}, select?: string[]): Promise<T[]> {
    try {
      const queryBuilder = this.repository.createQueryBuilder();
      if (select) {
        queryBuilder.select(select as string[]);
      }
      return await queryBuilder.getMany();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(filter: FindManyOptions<T> = {}, select?: string[]): Promise<T | null> {
    try {
      const queryBuilder = this.repository.createQueryBuilder();
      if (select) {
        queryBuilder.select(select as string[]);
      }
      return await queryBuilder.where(filter).getOne();
    } catch (error) {
      this.handleError(error);
    }
  }

  async paginate(
    filter: FindManyOptions<T> = {},
    page: number = 1,
    limit: number = 10,
    select?: string[]
  ): Promise<IPaginationResponse<T>> {
    try {
      if (page < 1) page = 1;
      if (limit < 1) limit = 1;

      const queryBuilder = this.repository.createQueryBuilder();

      if (select) {
        queryBuilder.select(select as string[]);
      }

      queryBuilder.skip((page - 1) * limit).take(limit);

      // Apply filter if any
      if (filter.where) {
        queryBuilder.where(filter.where);
      }

      const [data, total] = await queryBuilder.getManyAndCount();

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

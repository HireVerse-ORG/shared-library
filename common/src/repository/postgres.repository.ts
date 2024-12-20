import { DataSource, EntityTarget, FindManyOptions, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { IRepository } from '../types/repository.interface';

export class PostgresBaseRepository<T extends ObjectLiteral> implements IRepository<T> {
  private repository: Repository<T>;

  constructor(datsource: DataSource, entity: EntityTarget<T>) {
    this.repository = datsource.getRepository(entity);
  }

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findAll(filter: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(filter);
  }
}

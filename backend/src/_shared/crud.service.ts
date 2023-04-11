import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export class CrudService<Entity extends AbstractEntity> {
  constructor(protected repository: Repository<Entity>) {}

  async create(entity: DeepPartial<Entity>) {
    return await this.repository.save(this.repository.create(entity));
  }

  async find(
    filter: FindOptionsWhere<Entity> = {},
    sort: FindOptionsOrder<Entity> = { id: 'ASC' } as FindOptionsOrder<Entity>,
    skip = 0,
    limit?: number,
  ) {
    return await this.repository.find({
      where: filter,
      order: sort,
      skip,
      take: limit,
    });
  }

  async findOne(filter: FindOptionsWhere<Entity> = {}): Promise<Entity | null> {
    return await this.repository.findOneBy(filter);
  }

  async findOneById(id: string): Promise<Entity | null> {
    return await this.findOne({ id } as FindOptionsWhere<Entity>);
  }

  async update(entity: Entity, update: DeepPartial<Entity>) {
    await this.repository.save({ ...entity, ...update });
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}

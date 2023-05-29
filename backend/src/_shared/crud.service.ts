import { AbstractEntity } from 'common/entities';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export type FindManyOptions<Entity> = {
  filter: FindOptionsWhere<Entity>;
  sort: FindOptionsOrder<Entity>;
  skip: number;
  take: number;
  relations: FindOptionsRelations<Entity>;
};

export class CrudService<Entity extends AbstractEntity> {
  constructor(protected repository: Repository<Entity>) {}

  async create(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(this.repository.create(entity));
  }

  async find(
    { filter, sort, skip, take, relations }: Partial<FindManyOptions<Entity>> = {
      filter: {},
      sort: { id: 'ASC' } as FindOptionsOrder<Entity>,
      skip: 0,
      take: undefined,
      relations: {},
    }
  ): Promise<Entity[]> {
    return this.repository.find({
      where: filter,
      order: sort,
      skip: skip,
      take: take,
      relations: relations,
    });
  }

  async findOne(
    filter: FindOptionsWhere<Entity> = {},
    relations: FindOptionsRelations<Entity> = {}
  ): Promise<Entity | null> {
    return this.repository.findOne({ where: filter, relations });
  }

  async findOneById(
    id: string,
    relations: FindOptionsRelations<Entity> = {}
  ): Promise<Entity | null> {
    return this.findOne({ id } as FindOptionsWhere<Entity>, relations);
  }

  async update(entity: Entity, update: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save({ ...entity, ...update });
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}

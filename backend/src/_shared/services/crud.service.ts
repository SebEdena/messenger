import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export class CrudService<Entity extends { id: string }> {
  constructor(protected repository: Repository<Entity>) {}

  async create(data: DeepPartial<Entity>) {
    await this.repository.save(this.repository.create(data));
  }

  async find(data: FindOptionsWhere<Entity> = {}) {
    return await this.repository.findBy(data);
  }

  async findOne(data: FindOptionsWhere<Entity> = {}) {
    return await this.repository.findOneBy(data);
  }

  async findOneById(id: string) {
    return await this.findOne({ id } as FindOptionsWhere<Entity>);
  }

  update(id: number, data: DeepPartial<Entity>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
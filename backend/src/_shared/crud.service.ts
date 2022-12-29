import { DeepPartial, Repository } from 'typeorm';

export class CrudService<Entity> {
  constructor(protected repository: Repository<Entity>) {}

  async create(data: DeepPartial<Entity>) {
    await this.repository.save(this.repository.create(data));
  }

  async findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, data: DeepPartial<Entity>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

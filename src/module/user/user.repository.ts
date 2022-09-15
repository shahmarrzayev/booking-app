import { ObjectId } from 'mongodb';
import { GenericRepository } from './../../common/repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends GenericRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: MongoRepository<UserEntity>,
  ) {
    super();
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }

  async findById(id: string): Promise<UserEntity> {
    if (!id) return null;
    return await this.runQuery(() => this.repository.findOneBy({ _id: ObjectId(id) }));
  }

  async findByEmail(email: string): Promise<UserEntity> {
    if (!email) return null;
    return await this.runQuery(() => this.repository.findOneBy({ email }));
  }

  async findOneAndUpdate(id: string, entity: UserEntity): Promise<UserEntity> {
    if (!id) return null;
    return await this.runQuery(() => this.repository.findOneAndUpdate({ _id: ObjectId(id) }, { $set: entity }));
  }
}

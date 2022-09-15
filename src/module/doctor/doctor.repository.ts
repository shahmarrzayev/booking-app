import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from './../../common/repository';
import { Injectable } from '@nestjs/common';
import { DoctorEntity } from './doctor.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class DoctorRepository extends GenericRepository {
  constructor(
    @InjectRepository(DoctorEntity)
    private repository: MongoRepository<DoctorEntity>,
  ) {
    super();
  }

  async save(entity: DoctorEntity): Promise<DoctorEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }

  async findById(id: string): Promise<DoctorEntity> {
    if (!id) return null;
    return await this.runQuery(() => this.repository.findOneBy({ _id: ObjectId(id) }));
  }

  async findByEmail(email: string): Promise<DoctorEntity> {
    if (!email) return null;
    return await this.runQuery(() => this.repository.findOneBy({ email }));
  }

  async findOneAndUpdate(id: string, entity: DoctorEntity): Promise<DoctorEntity> {
    if (!id) return null;
    return await this.runQuery(() => this.repository.findOneAndUpdate({ _id: ObjectId(id) }, { $set: entity }));
  }
}

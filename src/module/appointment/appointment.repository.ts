import { ObjectId } from 'mongodb';
import { GenericRepository } from './../../common/repository';
import { AppointmentEntity } from './appointment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class AppointmentRepository extends GenericRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private repository: MongoRepository<AppointmentEntity>,
  ) {
    super();
  }

  async save(entity: AppointmentEntity): Promise<AppointmentEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }

  async findById(id: string): Promise<AppointmentEntity> {
    if (!id) return null;
    return await this.runQuery(() => this.repository.findOneBy({ _id: ObjectId(id) }));
  }

  async findByIds(ids: string[]): Promise<AppointmentEntity[]> {
    if (!ids) return null;
    return await this.runQuery(() => this.repository.findBy({ _id: { $in: ids.map((id) => ObjectId(id)) } }));
  }

  async findOneAndUpdate(id: string, entity: AppointmentEntity): Promise<AppointmentEntity> {
    if (!id || !entity) return null;
    return await this.runQuery(() => this.repository.findOneAndUpdate({ _id: ObjectId(id) }, { $set: entity }));
  }
}

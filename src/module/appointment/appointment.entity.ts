import { ObjectId } from 'mongodb';
import { DoctorEntity } from './../doctor/doctor.entity';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('appointments')
export class AppointmentEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  date: Date;

  @Column((type) => UserEntity)
  user: ObjectId;

  @Column((type) => DoctorEntity)
  doctor: ObjectId;

  @Column({ default: false })
  active: boolean;
}

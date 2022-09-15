import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('doctors')
export class DoctorEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  reg_token: string;

  @Column()
  phone_avatar: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  spec: string;

  @Column()
  free: boolean;

  @Column()
  appointments_accepted: ObjectId[];
}

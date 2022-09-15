import { AppointmentEntity } from './../appointment.entity';
export class SaveAppointmentDto {
  date: string;
  user: string;
  doctor: string;

  public static toEntity(dto: SaveAppointmentDto): AppointmentEntity {
    const entity = new AppointmentEntity();
    entity.date = new Date(dto.date);
    return entity;
  }
}

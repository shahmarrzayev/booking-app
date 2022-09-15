import { UserDto } from './../../user/dto/user.dto';
import { DoctorDto } from './../../doctor/dto/doctor.dto';
import { AppointmentEntity } from '../appointment.entity';
export class AppointmentDto {
  date: Date;
  user: UserDto;
  doctor: DoctorDto;
  active: boolean;

  public static fromEntity(entity: AppointmentEntity): AppointmentDto {
    const dto = new AppointmentDto();
    dto.date = entity.date;
    dto.user = UserDto.fromEntity(entity.user);
    dto.doctor = DoctorDto.fromEntity(entity.doctor);
    dto.active = entity.active;
    return dto;
  }
}

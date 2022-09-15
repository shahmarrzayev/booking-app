import { DoctorEntity } from './../doctor.entity';

export class DoctorDto {
  email: string;
  phone_avatar: string;
  phone: string;
  name: string;
  type: string;
  spec: string;
  free: boolean;

  public static fromEntity(entity: DoctorEntity) {
    const dto = new DoctorDto();
    dto.email = entity.email;
    dto.phone_avatar = entity.phone_avatar;
    dto.phone = entity.phone;
    dto.name = entity.name;
    dto.type = entity.type;
    dto.spec = entity.spec;
    dto.free = entity.free;
    return dto;
  }
}

import { DoctorEntity } from './../doctor.entity';
import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SaveDoctorDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_avatar: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  spec: string;

  @IsNotEmpty()
  @IsBoolean()
  free: boolean;

  public static toEntity(dto: SaveDoctorDto): DoctorEntity {
    const entity = new DoctorEntity();
    entity.email = dto.email;
    entity.phone_avatar = dto.phone_avatar;
    entity.phone = dto.phone;
    entity.name = dto.name;
    entity.spec = dto.spec;
    entity.free = dto.free;
    return entity;
  }
}

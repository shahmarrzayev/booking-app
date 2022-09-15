import { UserEntity } from './../user.entity';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SaveUserDto {
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

  public static toEntity(dto: SaveUserDto): UserEntity {
    const entity = new UserEntity();
    entity.email = dto.email;
    entity.phone = dto.phone;
    entity.name = dto.name;
    entity.phone_avatar = dto.phone_avatar;
    return entity;
  }
}

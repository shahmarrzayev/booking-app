import { UserEntity } from './../user.entity';
export class UserDto {
  email: string;
  phone_avatar: string;
  phone: string;
  name: string;
  type: string;

  public static fromEntity(entity: UserEntity) {
    const dto = new UserDto();
    dto.email = entity.email;
    dto.phone_avatar = entity.phone_avatar;
    dto.phone = entity.phone;
    dto.name = entity.name;
    dto.type = entity.type;
    return dto;
  }
}

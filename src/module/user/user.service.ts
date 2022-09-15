import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SaveUserDto } from './dto/saveUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly log = new Logger(UserService.name);

  async create(dto: SaveUserDto): Promise<UserEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.warn('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    if (await this.emailExists(dto.email)) {
      this.log.warn('create -- email already exists');
      throw new InternalServerErrorException('email already exists');
    }

    const entity = SaveUserDto.toEntity(dto);
    entity.type = 'user';

    const user = await this.userRepository.save(entity);
    if (!user) {
      this.log.warn('create --   could not save user');
      throw new InternalServerErrorException('could not save user');
    }
    this.log.debug('create -- success');
    return user;
  }

  async getById(id: string): Promise<UserEntity> {
    this.log.debug('getById -- start');
    if (!id) {
      this.log.warn('getById -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.log.warn('getById -- user not found');
      throw new InternalServerErrorException('user not found');
    }
    this.log.debug('getById -- success');
    return user;
  }

  private async emailExists(email: string): Promise<boolean> {
    const exists = await this.userRepository.findByEmail(email);
    return !!exists;
  }
}

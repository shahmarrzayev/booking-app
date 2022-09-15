import { UserDto } from './dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SaveUserDto } from './dto/saveUser.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(@Body() dto: SaveUserDto): Promise<UserDto> {
    const user = await this.userService.create(dto);
    return UserDto.fromEntity(user);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('user')
export default class UserContoller {
  constructor(private readonly userService: UsersService) {}

  @Post('createUser')
  async createUser(@Body() createUserDto) {
    return await this.userService.create(createUserDto);
  }
}

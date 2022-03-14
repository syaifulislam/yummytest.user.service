import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Users } from './schema/users.schema';
import { UsersService } from './users.service';
import { TCP_CHANNEL } from '../../core/commons/tcp-channel';
@Controller()
export class UsersController {
  constructor(private readonly service: UsersService){}

  @MessagePattern(TCP_CHANNEL.GET_USER_BY_ID)
  async getUsersById(@Payload() id: string): Promise<Users> {
    return await this.service.findById(id)
  }
}

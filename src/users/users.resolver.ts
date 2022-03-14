import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { CreateUsersRequest,LoginUsersRequest } from './dtos/users.input';
import { CreatedUserObject,LoginUserObject, UsersRole } from './object/users.object';
import { UsersService } from './users.service';
@Resolver('Users')
export class UsersResolver {
  constructor(private readonly service: UsersService){}
  
  @Mutation(returns => CreatedUserObject)
  async createUser(@Args('input') args: CreateUsersRequest): Promise<CreatedUserObject> {
    return await this.service.createUser(args);
  }

  @Mutation(returns => LoginUserObject)
  async loginUser(@Args('input') args: LoginUsersRequest): Promise<LoginUserObject> {
    return await this.service.loginUser(args)
  }
}

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schema/users.schema';
import { CreateUsersRequest, LoginUsersRequest } from './dtos/users.input';
import { CreatedUserObject, LoginUserObject } from './object/users.object';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') 
    private readonly model: Model<Users>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(body: CreateUsersRequest): Promise<CreatedUserObject> {
    if(await this.findByUsername(body.username)) {
      throw new BadRequestException('Username is exist!')
    }
    body.password = bcrypt.hashSync(body.password, 10);
    await new this.model({
      ...body,
    }).save();
    return {
      success: true
    }
  }

  async loginUser(body: LoginUsersRequest): Promise<LoginUserObject> {
    const getUser = await this.findByUsername(body.username)
    if (!getUser) 
      throw new NotFoundException('Username not found!');
    
    const comparePassword = await bcrypt.compare(
      body.password,
      getUser.password,
    );

    if (!comparePassword) {
      throw new UnauthorizedException('Invalid password!');
    }

    const token = this.jwtService.sign({
      id: getUser.id,
      fullname: getUser.fullname,
      username: getUser.username,
      roles: getUser.roles
    });
    return {
      id: getUser.id,
      fullname: getUser.fullname,
      username: getUser.username,
      roles: getUser.roles,
      token:token
    }
  }

  private async findByUsername(username: string): Promise<Users> {
    return await this.model.findOne({username}).exec()
  }

  async findById(id: string): Promise<Users> {
    return await this.model.findById(id)
  }
}

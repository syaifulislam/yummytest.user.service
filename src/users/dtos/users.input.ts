import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UsersRole } from '../object/users.object';

@InputType()
export class CreateUsersRequest {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsEnum(UsersRole)
  roles: UsersRole;
}

@InputType()
export class LoginUsersRequest {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

export enum UsersRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}


@ObjectType()
export class CreatedUserObject {
  @Field()
  success: boolean;
}

@ObjectType()
export class LoginUserObject {
  @Field(type => ID)
  id: number;

  @Field()
  fullname: String;

  @Field()
  username: String;

  @Field()
  roles: String;

  @Field()
  token: String;
}


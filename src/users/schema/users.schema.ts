import { Schema, Document } from 'mongoose';

export const UsersSchema = new Schema({
  username: String,
  password: String,
  fullname: String,
  roles: String,
});

export interface Users extends Document {
  readonly username: String;
  readonly password: String;
  readonly fullname: String;
  readonly roles: String;
 }
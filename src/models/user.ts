import { Document, model, Schema } from 'mongoose';
import * as tokenManager from '../lib/tokenManager';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
});

interface IUserSchema extends Document {
  username: string;
  password: string;
  friends: string[];
  rooms: string[];
}

UserSchema.methods.setPassword = async function (password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  this.password = hashedPassword;
};

UserSchema.methods.checkPassword = async function (password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
  };
  return tokenManager.generateToken(payload);
};

export interface IUserBase extends IUserSchema {
  setPassword(password: string): Promise<void>;
  checkPassword(password: string): Promise<boolean>;
  generateToken(): string;
}

const User = model<IUserBase>('User', UserSchema);

export default User;

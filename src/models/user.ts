import { Document, model, Schema } from 'mongoose';
import * as tokenManager from '../lib/tokenManager';
import bcrypt from 'bcrypt';
import { IRoom } from './room';

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
  avatarUrl: {
    type: String,
    default:
      'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v112-pla-41-shopicons_2.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=80&usm=15&vib=3&w=1300&s=ff0c91cd7cbd4652f3872bb1e1c05e69',
  },
  recommanded: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
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
  avatarUrl: string;
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
    avatarUrl: this.avatarUrl,
  };
  return tokenManager.generateToken(payload);
};

UserSchema.methods.serialize = function () {
  const data = {
    _id: this._id,
    username: this.username,
    avatarUrl: this.avatarUrl,
  };
  return data;
};

UserSchema.methods.acceptFriendRequest = function (id: string) {
  const friendsIndex = this.friends.indexOf(id);
  const recommandedIndex = this.recommanded.indexOf(id);
  if (recommandedIndex !== -1) {
    this.recommanded.splice(recommandedIndex, 1);
    if (friendsIndex === -1) this.friends.push(id);
  }
};

UserSchema.methods.removeFriend = function (id: string) {
  const recommandedIndex = this.recommanded.indexOf(id);
  const friendsIndex = this.friends.indexOf(id);
  if (recommandedIndex !== -1) this.recommanded.splice(recommandedIndex, 1);
  if (friendsIndex !== -1) this.friends.splice(friendsIndex, 1);
};

UserSchema.methods.leaveChatroom = function (roomId: string) {
  const index = this.rooms.indexOf(roomId);
  if (index !== -1) this.rooms.splice(index, 1);
};

interface IUserBase extends IUserSchema {
  setPassword(password: string): Promise<void>;
  checkPassword(password: string): Promise<boolean>;
  acceptFriendRequest(id: string): void;
  removeFriend(id: string): void;
  generateToken(): string;
  leaveChatroom(roomId: string): void;
  serialize(): {
    _id: string;
    username: string;
    avatarUrl: string;
  };
}

export interface IUser extends IUserBase {
  friends: IUser['_id'][];
  recommanded: IUser['_id'][];
  rooms: IRoom['_id'][];
}

export interface IUser_populated extends IUserBase {
  friends: IUser[];
  recommanded: IUser[];
  rooms: IRoom[];
}

const User = model<IUser>('User', UserSchema);

export default User;

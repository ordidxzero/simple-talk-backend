import { Document, model, Schema } from 'mongoose';
import { IRoom } from './room';
import { IUser } from './user';

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

interface IMessageSchema extends Document {
  text: string;
  createdAt?: number;
}

MessageSchema.methods.check = function () {
  console.log('success');
};

interface IMessageBase extends IMessageSchema {
  check(): void;
}

export interface IMessage extends IMessageBase {
  user: IUser['_id'];
  room: IRoom['_id'];
}

export interface IMessage_populated extends IMessageBase {
  user: IUser;
  room: IRoom;
}

const Message = model<IMessage>('Message', MessageSchema);

export default Message;

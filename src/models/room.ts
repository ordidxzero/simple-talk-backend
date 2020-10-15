import { Document, Model, model, Schema, Types } from 'mongoose';
import { IMessage } from './message';
import { IUser } from './user';

const RoomSchema = new Schema({
  roomname: String,
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

interface IRoomSchema extends Document {
  roomname?: string;
}

RoomSchema.methods.check = function () {
  console.log('check');
};

interface IRoomBase extends IRoomSchema {
  check(): void;
}

export interface IRoom extends IRoomBase {
  participants: IUser['_id'][];
  messages: IMessage['_id'][];
}

export interface IRoom_populated extends IRoomBase {
  participants: IUser[];
  messages: IMessage[];
}

RoomSchema.statics.checkIsExistOneToOne = async function (id: string, opponentId: string) {
  const participants = [id, opponentId].map(stringId => Types.ObjectId(stringId));
  const oneToOneChat = await this.findOne({ participants: { $all: participants } }).exec();
  if (!oneToOneChat) return null;
  return oneToOneChat._id.toString();
};

export interface RoomModel extends Model<IRoom> {
  checkIsExistOneToOne(id: string, opponentId: string): Promise<string | null>;
}

const Room = model<IRoom, RoomModel>('Room', RoomSchema);

export default Room;

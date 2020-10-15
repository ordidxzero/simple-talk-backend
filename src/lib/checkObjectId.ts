import { Types } from 'mongoose';

const { ObjectId } = Types;

const checkObjectId = (id: string): boolean => ObjectId.isValid(id);

export default checkObjectId;

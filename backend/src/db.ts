import mongoose, { model, Schema } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model('User', UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  description: { type: String, default: '' },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  imageUrl: { type: String, default: '' },
  fileUrl: { type: String, default: '' },
  fileName: { type: String, default: '' },
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  order: { type: Number, default: 0 },
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});
const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
});

export const LinkModel = model('Links', LinkSchema);
export const ContentModel = model('Content', ContentSchema);

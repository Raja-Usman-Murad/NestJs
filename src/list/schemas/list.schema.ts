import * as mongoose from 'mongoose';

export const ListsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: String, required: true },
});

import { Document } from 'mongoose';

export interface List extends Document {
  id: string;
  title: string;
  description: string;
  email: string;
  createdAt: string;
}

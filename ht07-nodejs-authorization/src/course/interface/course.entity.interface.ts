import { Document } from 'mongoose';

export interface ICourse extends Document {
	name: string;
	teacher: string;
}

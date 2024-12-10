import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from './interface/user.model.interface';

const userSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

// Класс-обёртка для модели Mongoose
export class UserModel {
	private model: Model<IUser>;

	constructor() {
		this.model = mongoose.model<IUser>('User', userSchema);
	}

	async createUser(userData: Partial<IUser>): Promise<IUser> {
		const user = new this.model(userData);
		return await user.save();
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return await this.model.findOne({ email }).exec();
	}

	async getAllUsers(): Promise<IUser[]> {
		return await this.model.find().exec();
	}

	async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
		return await this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
	}

	async deleteUser(id: string): Promise<IUser | null> {
		return await this.model.findByIdAndDelete(id).exec();
	}
}

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
		collection: 'user'
	},
);

export class UserModel {
	private model: Model<IUser>;

	constructor() {
		this.model = mongoose.model<IUser>('user', userSchema);
	}

	async createUser(userData: Partial<IUser>): Promise<IUser> {
		if (!userData.email || !userData.name || !userData.password) {
			throw new Error('Missing required fields: email, name, or password');
		}
		const user = new this.model({
			name: userData.name,
			email: userData.email,
			password: userData.password,
		});

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
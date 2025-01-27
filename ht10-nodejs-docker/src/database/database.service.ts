import mongoose from 'mongoose';

export class Database {
	private uri: any;
	constructor(uri: string) {
		this.uri = uri;
	}

	async connect(): Promise<void> {
		try {
			await mongoose.connect(this.uri);
			console.log('Connected to MongoDB');
		} catch (error) {
			console.error('Database connection error:', error);
			process.exit(1);
		}
	}
	disconnect(): void {
		mongoose.connection
			.close()
			.then(() => {
				console.log('Disconnected from MongoDB');
				process.exit(0);
			})
			.catch((error) => {
				console.error('Error while disconnecting from MongoDB:', error);
			});
	}
}

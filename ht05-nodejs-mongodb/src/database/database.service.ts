import mongoose from 'mongoose';

export class Database {
	private uri: any;
	constructor(uri: string) {
		this.uri = uri;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	async connect() {
		try {
			await mongoose.connect(this.uri);
			console.log('Connected to MongoDB');
		} catch (error) {
			console.error('Database connection error:', error);
			process.exit(1); // Завершаем процесс при ошибке
		}
	}

	// disconnect() {
	// 	mongoose.connection.close(() => {
	// 		console.log('Disconnected from MongoDB');
	// 		process.exit(0);
	// 	});
	// }
}

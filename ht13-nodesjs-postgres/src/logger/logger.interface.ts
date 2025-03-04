export interface LogMessage {
	timestamp: Date;
	level: 'info' | 'error';
	message: string;
}

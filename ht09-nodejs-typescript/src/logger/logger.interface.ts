export interface ILogger {
	// timestamp: Date;
	// level: 'info' | 'error';
	// message: string;
	logger: unknown;
	log: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
}

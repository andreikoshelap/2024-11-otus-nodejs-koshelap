
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import {LoggerService} from "../logger/logger.service";
import {LogMessage} from "../logger/logger.interface";
import { IConfigService } from './interface/config.service.interface';

export class ConfigService implements IConfigService{
	private _config: DotenvParseOutput;
	constructor(private logger: LoggerService<LogMessage>) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] can not read file .env or it absent');
			this._config = result.parsed as DotenvParseOutput;
		} else {
			this.logger.log('[ConfigService] Configuration .env loaded');
			this._config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this._config[key];
	}
}

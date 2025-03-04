import { DataSource } from 'typeorm';
import { connection } from './connection';

export default new DataSource(connection);

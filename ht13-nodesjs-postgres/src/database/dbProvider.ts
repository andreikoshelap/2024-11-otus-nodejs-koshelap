import { DataSource } from 'typeorm';

export const providers = {
  provide: 'OTUS',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'otus',
      entities: ['./src/db/Entities/*.entity.ts'],
      // migrations: ['./migrations/*.js'],
      // migrationsTableName: '__migrations',
    });
    return dataSource.initialize();
  },
};

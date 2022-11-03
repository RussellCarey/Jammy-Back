/* eslint-disable @typescript-eslint/no-var-requires */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PROD_DB_PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('PROD_DB_HOST'),
      port: parseInt(this.getValue('PROD_DB_PORT')),
      username: this.getValue('PROD_DB_USERNAME'),
      password: this.getValue('PROD_DB_PW'),
      database: this.getValue('PROD_DB_NAME'),
      migrationsTableName: 'migration',
      migrations: ['./src/migration/**/*.ts'],
      entities: ['dist/modules/**/entities/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,

      //   cli: {
      //     migrationsDir: 'src/migrations',
      //   },

      ssl: false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PROD_DB_HOST',
  'PROD_DB_PORT',
  'PROD_DB_USERNAME',
  'PROD_DB_PW',
  'PROD_DB_NAME',
]);

export { configService };

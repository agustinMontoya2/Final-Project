import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const PORT: number = Number(process.env.PORT);
export const DB_NAME: string = process.env.DB_NAME;
export const DB_USER: string = process.env.DB_USER;
export const DB_PASSWORD: string = process.env.DB_PASSWORD;
export const DB_HOST: string = process.env.DB_HOST;
export const DB_PORT: number = Number(process.env.DB_PORT);

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST') || DB_HOST,
  port: +configService.get('DB_PORT') || DB_PORT,
  username: configService.get('DB_USERNAME') || DB_USER,
  password: configService.get('DB_PASSWORD') || DB_PASSWORD,
  database: configService.get('DB_NAME') || DB_NAME,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  // dropSchema: true,
});

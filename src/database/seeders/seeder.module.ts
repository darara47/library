import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthorsSeederModule } from './modules/authors/authors.seeder.module';
import { BooksSeederModule } from './modules/books/books.seeder.module';
import { UsersSeederModule } from './modules/users/users.seeder.module';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersSeederModule,
    AuthorsSeederModule,
    BooksSeederModule,
  ],
})
export class SeederModule {}

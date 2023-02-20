import { NestFactory } from '@nestjs/core';
import { AuthorsSeederService } from './modules/authors/authors.seeder.service';
import { BooksSeederService } from './modules/books/books.seeder.service';
import { UsersSeederService } from './modules/users/users.seeder.service';
import { SeederModule } from './seeder.module';

const runSeed = async () => {
  const app = await NestFactory.create(SeederModule);

  // run
  await app.get(UsersSeederService).create();
  await app.get(AuthorsSeederService).create();
  await app.get(BooksSeederService).create();

  await app.close();
};

void runSeed();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/modules/authors/author.entity';
import { AuthorsSeederService } from './authors.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsSeederService],
  exports: [AuthorsSeederService],
})
export class AuthorsSeederModule {}

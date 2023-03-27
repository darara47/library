import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryRunnerSource } from '../../../query-runner';
import { Author } from '../../../../modules/authors/author.entity';
import { AuthorsSeederService } from './authors.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsSeederService, QueryRunnerSource],
  exports: [AuthorsSeederService],
})
export class AuthorsSeederModule {}

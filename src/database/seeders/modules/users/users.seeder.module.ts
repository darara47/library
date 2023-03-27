import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryRunnerSource } from '../../../query-runner';
import { User } from '../../../../modules/users/user.entity';
import { UsersSeederService } from './users.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersSeederService, QueryRunnerSource],
  exports: [UsersSeederService],
})
export class UsersSeederModule {}

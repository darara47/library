import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authorsMock } from '../../../../mocks/authors.mock';
import { Repository } from 'typeorm';
import { Author } from '../../../../modules/authors/author.entity';

@Injectable()
export class AuthorsSeederService {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) {}

  async create() {
    const addedAuthors = authorsMock.map(async (author) => {
      const isAdded = await this.repository.findOneBy({
        id: author.id,
      });

      if (isAdded) {
        return Promise.resolve();
      }

      return await this.repository.save(this.repository.create(author));
    });

    return Promise.all(addedAuthors);
  }
}

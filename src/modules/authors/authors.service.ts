import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorResponse } from 'src/types/authors.type';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryFindAuthorDto } from './dto/query-find-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorResponse> {
    const author = this.authorsRepository.create(createAuthorDto);

    await this.authorsRepository.save(author);

    return this.mapAuthor(author);
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorResponse> {
    const author = await this.authorsRepository.preload({
      ...updateAuthorDto,
      id,
    });

    if (!author) {
      throw new NotFoundException(`Author #${id} not found`);
    }

    await this.authorsRepository.save(author);

    return this.mapAuthor(author);
  }

  async search(queryFindAuthorDto: QueryFindAuthorDto) {
    // TODO
    console.log({ queryFindAuthorDto });
  }

  async findOne(id: string): Promise<AuthorResponse> {
    const author = await this.authorsRepository.findOneBy({ id });

    if (!author) {
      throw new NotFoundException(`Author #${id} not found`);
    }

    return this.mapAuthor(author);
  }

  async remove(id: string): Promise<void> {
    const author = await this.findOne(id);

    await this.authorsRepository.softRemove(author);
  }

  private mapAuthor(author: Author): AuthorResponse {
    return {
      firstName: author.firstName,
      lastName: author.lastName,
      fullName: `${author.firstName} ${author.lastName}`,
      biography: author.biography,
      birthDate: author.birthDate,
      deathDate: author?.deathDate,
    };
  }
}

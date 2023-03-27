import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthorResponse,
  SearchQueryAuthorsResponse,
} from '../../types/author.type';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryFindAuthorDto } from './dto/query-find-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { getPagesResponse } from 'src/types/paginators';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async create(
    createAuthorDto: CreateAuthorDto,
    userId: string,
  ): Promise<AuthorResponse> {
    const author = this.authorsRepository.create({
      ...createAuthorDto,
      createdBy: userId,
    });
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

  async search(
    queryFindAuthorDto: QueryFindAuthorDto,
  ): Promise<SearchQueryAuthorsResponse> {
    const { isAlive, limit, name, orderBy, orderDirection, page } =
      queryFindAuthorDto;

    const [results, totalNumber] = await this.authorsRepository
      .createQueryBuilder('authors')
      .where(
        !!name &&
          `LOWER(CONCAT(authors.firstName, ' ', authors.lastName)) LIKE LOWER(:name)`,
        {
          name: `%${name}%`,
        },
      )
      .andWhere(
        isAlive !== undefined &&
          `authors.deathDate IS ${(!isAlive && 'NOT') || ''} NULL`,
      )
      .orderBy(`authors.${orderBy}`, orderDirection)
      .offset(limit * (page - 1))
      .limit(limit)
      .getManyAndCount();

    const pagesResponse = getPagesResponse(totalNumber, limit, page);

    return { data: this.mapAuthors(results), pages: pagesResponse };
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
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      fullName: `${author.firstName} ${author.lastName}`,
      birthDate: author.birthDate,
      deathDate: author?.deathDate,
    };
  }

  private mapAuthors(authors: Author[]): AuthorResponse[] {
    return authors.map((author) => this.mapAuthor(author));
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorResponse } from '../../types/author.type';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryFindAuthorDto } from './dto/query-find-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

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

  async search(queryFindAuthorDto: QueryFindAuthorDto) {
    const { filters, paginators } = queryFindAuthorDto;

    const results = await this.authorsRepository
      .createQueryBuilder('authors')
      .where(
        `LOWER(CONCAT(authors.firstName, ' ', authors.lastName)) LIKE LOWER(:name)`,
        {
          name: `%${filters.name}%`,
        },
      )
      .andWhere(
        filters.isAlive !== undefined &&
          `authors.deathDate IS ${(!filters.isAlive && 'NOT') || ''} NULL`,
      )
      .orderBy(
        `authors.${paginators.order.byColumn}`,
        paginators.order.direction,
      )
      .offset(paginators.page.size * (paginators.page.index - 1))
      .limit(paginators.page.size)
      .getMany();

    return this.mapAuthors(results);
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

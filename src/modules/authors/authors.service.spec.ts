import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { authorsMock } from '../../mocks/authors.mock';
import { Repository, DataSource } from 'typeorm';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';
import { NotFoundException } from '@nestjs/common';
import { usersMock } from '../../mocks/users.mock';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockRepository = jest.fn(() => ({
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  findOneBy: jest.fn(),
}));

describe('AuthorsService', () => {
  let authorsService: AuthorsService;
  let authorsRepository: MockRepository;

  const expectedAuthorResponse = {
    id: authorsMock[0].id,
    firstName: authorsMock[0].firstName,
    lastName: authorsMock[0].lastName,
    fullName: `${authorsMock[0].firstName} ${authorsMock[0].lastName}`,
    birthDate: authorsMock[0].birthDate,
    deathDate: authorsMock[0].deathDate,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Author),
          useClass: mockRepository,
        },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    authorsRepository = module.get<MockRepository>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(authorsService).toBeDefined();
  });

  describe('create', () => {
    it('should create the new author', async () => {
      const createAuthorDto = {
        firstName: authorsMock[0].firstName,
        lastName: authorsMock[0].lastName,
        birthDate: authorsMock[0].birthDate,
        deathDate: authorsMock[0].deathDate,
      };

      authorsRepository.create.mockReturnValue(authorsMock[0]);
      const author = await authorsService.create(
        createAuthorDto,
        usersMock[0].id,
      );
      expect(author).toEqual(expectedAuthorResponse);
    });
  });

  describe('update', () => {
    const updateAuthorDto = {
      firstName: 'Olivia',
    };
    describe('when author with ID exists', () => {
      it('should update the author', async () => {
        const authorId = authorsMock[0].id;

        authorsRepository.preload.mockReturnValue(authorsMock[0]);
        const author = await authorsService.update(authorId, updateAuthorDto);
        expect(author).toEqual(expectedAuthorResponse);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const authorId = '';

        authorsRepository.preload.mockReturnValue(null);

        try {
          await authorsService.update(authorId, updateAuthorDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('findOne', () => {
    describe('when author with ID exists', () => {
      it('should return the author', async () => {
        const authorId = authorsMock[0].id;

        authorsRepository.findOneBy.mockReturnValue(authorsMock[0]);
        const author = await authorsService.findOne(authorId);
        expect(author).toEqual(expectedAuthorResponse);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const authorId = '';

        authorsRepository.findOneBy.mockReturnValue(null);

        try {
          await authorsService.findOne(authorId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});

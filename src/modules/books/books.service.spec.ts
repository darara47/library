import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { booksMock } from '../../mocks/books.mock';
import { Repository, DataSource } from 'typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockRepository = jest.fn(() => ({
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  findOneBy: jest.fn(),
}));

describe('BooksService', () => {
  let booksService: BooksService;
  let booksRepository: MockRepository;

  const expectedBookResponse = {
    id: booksMock[0].id,
    title: booksMock[0].title,
    author: booksMock[0].author,
    publicationDate: booksMock[0].publicationDate,
    genre: booksMock[0].genre,
    totalCopies: booksMock[0].totalCopies,
    availableCopies: booksMock[0].availableCopies,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Book),
          useClass: mockRepository,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    booksRepository = module.get<MockRepository>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('create', () => {
    it('should create the new book', async () => {
      const createBookDto = {
        title: booksMock[0].title,
        authorId: booksMock[0].author.id,
        publicationDate: booksMock[0].publicationDate,
        genre: booksMock[0].genre,
        totalCopies: booksMock[0].totalCopies,
        availableCopies: booksMock[0].availableCopies,
      };

      booksRepository.create.mockReturnValue(booksMock[0]);
      const book = await booksService.create(createBookDto);
      expect(book).toEqual(expectedBookResponse);
    });
  });

  describe('update', () => {
    const updateBookDto = {
      availableCopies: 2,
    };
    describe('when book with ID exists', () => {
      it('should update the book', async () => {
        const bookId = booksMock[0].id;

        booksRepository.preload.mockReturnValue(booksMock[0]);
        const book = await booksService.update(bookId, updateBookDto);
        expect(book).toEqual(expectedBookResponse);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const bookId = '';

        booksRepository.preload.mockReturnValue(null);

        try {
          await booksService.update(bookId, updateBookDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('findOne', () => {
    describe('when book with ID exists', () => {
      it('should return the book', async () => {
        const bookId = booksMock[0].id;

        booksRepository.findOneBy.mockReturnValue(booksMock[0]);
        const book = await booksService.findOne(bookId);
        expect(book).toEqual(expectedBookResponse);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const bookId = '';

        booksRepository.findOneBy.mockReturnValue(null);

        try {
          await booksService.findOne(bookId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});

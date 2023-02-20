import { Author } from 'src/modules/authors/author.entity';

export type BookResponse = {
  id: string;
  title: string;
  author: Author;
  publicationDate: Date;
  genre: string;
  totalCopies: number;
  availableCopies: number;
};

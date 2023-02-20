import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Author } from '../authors/author.entity';

@Entity('books')
@Check('"totalCopies" >= 0')
@Check('"availableCopies" >= 0')
@Check('"totalCopies" >= "availableCopies"')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.id)
  @JoinColumn()
  author: Author;

  @Column()
  publicationDate: Date;

  @Column()
  genre: string;

  @Column()
  totalCopies: number;

  @Column()
  availableCopies: number;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;

  @DeleteDateColumn({ select: false })
  deletedDate: Date;
}

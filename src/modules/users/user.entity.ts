import { UserRoles } from '../../types/userRoles.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ select: false, nullable: true })
  activationAccountToken: string;

  @Column({ select: false, nullable: true })
  activationAccountTokenExpiresAt: Date;

  @Column({ select: false, nullable: true })
  resetPasswordCode: string;

  @Column({ select: false, nullable: true })
  resetPasswordToken: string;

  @Column({ select: false, nullable: true })
  resetPasswordTokenExpiresAt: Date;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.reader,
  })
  role: UserRoles;

  @CreateDateColumn({ select: false })
  createdDate: Date;

  @UpdateDateColumn({ select: false })
  updatedDate: Date;

  @DeleteDateColumn({ select: false })
  deletedDate: Date;
}

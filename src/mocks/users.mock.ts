import { User } from 'src/modules/users/user.entity';
import { UserRoles } from 'src/types/userTypes.enum';

export const usersMock: User[] = [
  {
    id: '00000000-0000-0000-0001-000000000001',
    firstName: 'Johny',
    lastName: 'Reader',
    email: 'johny.reader@test.com',
    password: '$2a$10$4kI5PShtQoMkmzKdt7jOfuRodnBTYjUApX2w7aEqjXTx/vmBiF3qG', // Password!123
    activationAccountToken: null,
    activationAccountTokenExpiresAt: null,
    resetPasswordCode: null,
    resetPasswordToken: null,
    resetPasswordTokenExpiresAt: null,
    role: UserRoles.reader,
    createdBy: null,
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedDate: null,
  },
  {
    id: '00000000-0000-0000-0001-000000000002',
    firstName: 'Johny',
    lastName: 'Librarian',
    email: 'johny.librarian@test.com',
    password: '$2a$10$4kI5PShtQoMkmzKdt7jOfuRodnBTYjUApX2w7aEqjXTx/vmBiF3qG', // Password!123
    activationAccountToken: null,
    activationAccountTokenExpiresAt: null,
    resetPasswordCode: null,
    resetPasswordToken: null,
    resetPasswordTokenExpiresAt: null,
    role: UserRoles.librarian,
    createdBy: null,
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedDate: null,
  },
  {
    id: '00000000-0000-0000-0001-000000000003',
    firstName: 'Johny',
    lastName: 'Admin',
    email: 'johny.admin@test.com',
    password: '$2a$10$4kI5PShtQoMkmzKdt7jOfuRodnBTYjUApX2w7aEqjXTx/vmBiF3qG', // Password!123
    activationAccountToken: null,
    activationAccountTokenExpiresAt: null,
    resetPasswordCode: null,
    resetPasswordToken: null,
    resetPasswordTokenExpiresAt: null,
    role: UserRoles.admin,
    createdBy: null,
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedDate: null,
  },
];

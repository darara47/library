import { UserRoles } from './userRoles.enum';

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: UserRoles;
};

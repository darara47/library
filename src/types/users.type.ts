import { UserRoles } from './userTypes.enum';

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: UserRoles;
};

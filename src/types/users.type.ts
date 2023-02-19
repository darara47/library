import { UserTypes } from './userTypes.enum';

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  type: UserTypes;
};

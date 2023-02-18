import { UserTypes } from './userTypes.enum';

export type UserResponse = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  type: UserTypes;
};

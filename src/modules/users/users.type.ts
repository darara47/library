import { UserTypes } from 'src/types/userTypes';

export type UserResponse = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  type: UserTypes;
};

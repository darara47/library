import { UserRoles } from './userTypes.enum';

export type LoggedUser = {
  email: string;
  id: string;
  role: UserRoles;
};

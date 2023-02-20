import { UserRoles } from './userRoles.enum';

export type LoggedUser = {
  email: string;
  id: string;
  role: UserRoles;
};

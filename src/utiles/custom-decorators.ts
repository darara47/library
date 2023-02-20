import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { JwtValidateAuthDto } from 'src/modules/auth/dto/jwt-validate-auth.dto';
import { UserRoles } from 'src/types/userRoles.enum';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (role: UserRoles) => SetMetadata(ROLES_KEY, role);

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const mapUser = (authData: JwtValidateAuthDto) => ({
      email: authData.email,
      id: authData.userId,
      role: authData.role,
    });

    const request = context.switchToHttp().getRequest();
    return mapUser(request.user);
  },
);

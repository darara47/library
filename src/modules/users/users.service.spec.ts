import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { usersMock } from '../../mocks/users.mock';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockRepository = jest.fn(() => ({
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  findOneBy: jest.fn(),
  findOne: jest.fn(),
}));

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository;

  const expectedUserResponse = {
    id: usersMock[0].id,
    firstName: usersMock[0].firstName,
    lastName: usersMock[0].lastName,
    fullName: `${usersMock[0].firstName} ${usersMock[0].lastName}`,
    email: usersMock[0].email,
    role: usersMock[0].role,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(User),
          useClass: mockRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create the new user', async () => {
      const createUserDto = {
        firstName: usersMock[0].firstName,
        lastName: usersMock[0].lastName,
        email: usersMock[0].email,
        password: 'Password!123',
        activationAccountToken:
          '93638578159d533a39c34c862cdf2a691a9bcce3c7cc3468a857c9e8aae10a50',
        activationAccountTokenExpiresAt: new Date(),
        role: usersMock[0].role,
      };

      usersRepository.create.mockReturnValue(usersMock[0]);
      const user = await usersService.create(createUserDto);
      expect(user).toEqual(expectedUserResponse);
    });
  });

  describe('update', () => {
    const updateUserDto = {
      firstName: usersMock[0].firstName,
    };
    describe('when user with ID exists', () => {
      it('should update the user', async () => {
        const userId = usersMock[0].id;

        usersRepository.preload.mockReturnValue(usersMock[0]);
        const user = await usersService.update(userId, updateUserDto);
        expect(user).toEqual(expectedUserResponse);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const userId = '';

        usersRepository.preload.mockReturnValue(null);

        try {
          await usersService.update(userId, updateUserDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('findOne', () => {
    describe('when user with ID exists', () => {
      it('should return the user', async () => {
        const userId = usersMock[0].id;

        usersRepository.findOneBy.mockReturnValue(usersMock[0]);
        const user = await usersService.findOne({ id: userId });
        expect(user).toEqual(expectedUserResponse);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const userId = '';

        usersRepository.findOneBy.mockReturnValue(null);

        try {
          await usersService.findOne({ id: userId });
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('loginValidation', () => {
    const email = usersMock[0].email;
    const password = 'CorrectPassword!123';
    const cryptPassword =
      '$2a$10$b2dLS8CaG.nUWgFIMEuic.fSeXpkq8V95EtTVv/ZKXnm4IDNl1xJK';
    const incorrectPassword = 'incorrectPassword!123';

    describe('when credentials are correct', () => {
      it("shouldn't throw any error", async () => {
        usersRepository.findOne.mockReturnValue({
          password: cryptPassword,
        });

        try {
          await usersService.loginValidation(email, password);
        } catch (err) {
          expect(err).toBeNull();
        }
      });
    });

    describe('when email is incorrect', () => {
      it('should throw an error', async () => {
        usersRepository.findOne.mockReturnValue(null);

        try {
          await usersService.loginValidation(email, password);
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
          expect(err.message).toEqual(
            `Can't find user with given credentials.`,
          );
        }
      });
    });

    describe('when password is incorrect', () => {
      it('should throw an error', async () => {
        usersRepository.findOne.mockReturnValue({
          password: incorrectPassword,
        });

        try {
          await usersService.loginValidation(email, password);
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
          expect(err.message).toEqual(
            `Can't find user with given credentials.`,
          );
        }
      });
    });
  });

  describe('getResetPasswordToken', () => {
    const email = usersMock[0].email;
    const code = '123456';
    const expectedResetPasswordToken =
      '$2a$10$b2dLS8CaG.nUWgFIMEuic.fSeXpkq8V95EtTVv/ZKXnm4IDNl1xJK';

    describe('when credentials are correct', () => {
      it("shouldn't throw any error", async () => {
        usersRepository.findOne.mockReturnValue({
          resetPasswordToken: expectedResetPasswordToken,
        });

        try {
          const resetPasswordToken = await usersService.getResetPasswordToken({
            email,
            code,
          });
          expect(resetPasswordToken).toEqual(expectedResetPasswordToken);
        } catch (err) {
          expect(err).toBeNull();
        }
      });
    });

    describe('when credentials are correct', () => {
      it("shouldn't throw any error", async () => {
        usersRepository.findOne.mockReturnValue(null);

        try {
          await usersService.getResetPasswordToken({
            email,
            code,
          });
        } catch (err) {
          expect(err).toBeInstanceOf(UnauthorizedException);
          expect(err.message).toEqual(
            `Can't find user with given credentials.`,
          );
        }
      });
    });
  });
});

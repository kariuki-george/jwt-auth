import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon from 'argon2';
import { User } from 'src/@generated/user/user.model';
import { UserCreateInput } from 'src/@generated/user/user-create.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserInput: UserCreateInput): Promise<User> {
    const { email, password } = createUserInput;
    console.log(createUserInput);
    try {
      const hash = await argon.hash(password);
      return this.prisma.user.create({
        data: { email, password: hash },
      });
    } catch (error) {
      console.error(error);
      throw InternalServerErrorException;
    }
  }
}

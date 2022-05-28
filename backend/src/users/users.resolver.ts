import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/@generated/user/user.model';
import { UserCreateInput } from 'src/@generated/user/user-create.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => User)
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: UserCreateInput,
  ): Promise<User> {
    console.log('iihihihi');

    return this.usersService.create(createUserInput);
  }
}

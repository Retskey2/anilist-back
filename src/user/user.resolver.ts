import { Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { Auth } from "src/auth/decorators/auth.decorator";
import { User } from "./decorators/user.decorator";
import { User as UserEntity } from "./user.entity";
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(()=> [UserEntity])
    async users() {
        return this.userService.getAll()
    }

    @Query(()=> UserEntity)
    @Auth()
    async profile(@User('id') id: number) {
        return this.userService.byId(id)
    }

}
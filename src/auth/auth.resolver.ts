import { Req } from "@nestjs/common";
import { Args, Context, GqlContextType, Mutation, Query } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { GqlContext } from "src/app.interface";

import { User } from "src/user/user.entity";
import { Request } from "supertest";
import { AuthReturn } from "./auth.inteface";
import { AuthService } from "./auth.service";
import AuthInput from "./inputs/create-user.input";
import RefreshTokenInput from "./inputs/refresh-token.input";



@Resolver()
export class AuthResolver {
    UserService: any;
    constructor(private readonly authService: AuthService) {}

    @Mutation(()=> AuthReturn) 
    async login(@Args('data') input: AuthInput,) {
        return this.authService.login(input)
    }

    @Mutation(()=> AuthReturn) 
    async getNewToken(
        @Context() {req}: GqlContext
    ) {
        const refreshToken = req.cookies.refreshToken
        return this.authService.getNewTokens(refreshToken)
    }

    @Mutation(()=> AuthReturn) 
    async register(@Args('data') input: AuthInput,) {
        return this.authService.register(input)
    }

}
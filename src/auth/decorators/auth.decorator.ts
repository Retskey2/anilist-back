import { applyDecorators, UseGuards } from "@nestjs/common";
import { UserRole } from "src/user/user.entity";
import { OnlyAdminGurad } from "../guards/admin.guard";
import { OnlyEditornGuard } from "../guards/editor.guard";
import { GqlAuthGuard } from "../guards/gql-auth.guard";


export const Auth = (role: UserRole = UserRole.GUEST) => applyDecorators(
    role === UserRole.ADMIN 
    ? UseGuards(GqlAuthGuard, OnlyAdminGurad) 
    : role === UserRole.EDITOR 
    ? UseGuards(GqlAuthGuard, OnlyEditornGuard)
    : UseGuards(GqlAuthGuard))
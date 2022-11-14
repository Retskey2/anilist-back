import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
;
import { User, UserRole } from "src/user/user.entity";

export class OnlyAdminGurad implements CanActivate{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean{
        const ctx = GqlExecutionContext.create(context)
        const user = ctx.getContext().req.user as User

        if(user.role !== UserRole.ADMIN)
         throw new ForbiddenException("You don't have permission!")

        return true
    }
}
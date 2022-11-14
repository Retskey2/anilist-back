import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User, UserRole } from "src/user/user.entity";

export class OnlyEditornGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest<{user: User}>()
        const user = request.user

        if(user.role !== UserRole.EDITOR && user.role !== UserRole.ADMIN) throw new ForbiddenException("You don't have permission!")

        return true
    }
}
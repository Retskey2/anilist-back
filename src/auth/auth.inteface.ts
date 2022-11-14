import { Field, ObjectType } from "@nestjs/graphql"
import { User } from "src/user/user.entity"

@ObjectType()
export class AuthReturn extends User {
    @Field()
    refreshToken: string
    @Field()
    accessToken: string
}
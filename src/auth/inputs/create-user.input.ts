import { Field, InputType } from "@nestjs/graphql";

@InputType()
export default class AuthInput {
    @Field()
    readonly username: string;

    @Field()
    readonly email: string;

    @Field()
    readonly password: string;
}
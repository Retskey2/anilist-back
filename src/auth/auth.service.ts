import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';

import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import AuthInput from './inputs/create-user.input';
import RefreshTokenInput from './inputs/refresh-token.input';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
      ){}

    async login (input: AuthInput) {
        const user = await this.validateUser(input)
        const tokens = await this.issueTokenPair(user.id)

        return {
            ...user, ...tokens
        }
    }

    async validateUser(input: AuthInput): Promise<User> {
        const user = await this.userRepository.findOneBy(
           {email: input.email}
        )
        if(!user) throw new UnauthorizedException('User not found')

        const isValidPassword = await compare(input.password, user.password)
        if(!isValidPassword) throw new UnauthorizedException('Inavalid password')

        return user
    }

    async issueTokenPair(userId: number) {
        const data = {id: userId}

        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d'
        })

        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '1h'
        })

        return {refreshToken, accessToken}
    }

    async getNewTokens(refreshToken: string) {
        if(!refreshToken) throw new UnauthorizedException('Please sign in')

        const result = await this.jwtService.verifyAsync(refreshToken)
        if(!result) throw new UnauthorizedException('Invalid token or expired')

        const user = await this.userRepository.findOneBy({id: result.id})

        const tokens = await this.issueTokenPair(user.id)

        return {
            ...user,
            ...tokens
        }
    }

    async register(input: AuthInput) {
    const oldUser = await this.userRepository.findOneBy({
   email: input.email.toLowerCase().trim()
    })
    if(oldUser)
    throw new BadRequestException('User with this email is already in the system')

    const salt = await genSalt(10)

    const newUser = this.userRepository.create({
    username: input.username,
    email: input.email.toLowerCase().trim(),
    password: await hash(input.password, salt),
    })

    const user = await this.userRepository.save(newUser)

    const tokens = await this.issueTokenPair(user.id)

    return {
        ...user,
        ...tokens
    }
    }
}


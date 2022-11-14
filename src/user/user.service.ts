import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	async byId(id: number) {
		const user = await this.userRepository.findOneBy({ id })
		if (!user) throw new NotFoundException('user not found')

		return user
	}

	async getAll() {
		return this.userRepository.find()
	}
}

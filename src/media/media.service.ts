import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Media } from './media.entity'

@Injectable()
export class MediaService {
	constructor(
		@InjectRepository(Media) private mediaRepository: Repository<Media>
	) {}

	async getAll() {
		return this.mediaRepository.find()
	}
}

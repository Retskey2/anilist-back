import { Query, Resolver } from '@nestjs/graphql'
import { Media as MediaEntity } from './media.entity'
import { MediaService } from './media.service'

@Resolver()
export class MediaResolver {
	constructor(private readonly mediaService: MediaService) {}

	@Query(() => [MediaEntity])
	async anime() {
		return this.mediaService.getAll()
	}
}

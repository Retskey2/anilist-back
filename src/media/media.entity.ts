import { Field, ObjectType } from '@nestjs/graphql'
import {
	UpdateDateColumn,
	CreateDateColumn,
	Entity,
	Column,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { MediaType } from './media.types'

@Entity({ name: 'media', schema: 'public' })
@ObjectType()
export class Media {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column({ unique: true })
	title: string

	@Field((type) => MediaType)
	@Column({
		enum: MediaType,
		type: 'enum',
	})
	type: MediaType

	@Field()
	@Column()
	basedOnManga: string

	@Field()
	@Column()
	releasedEpisode: number

	@Field()
	@Column()
	maxCountSeries: number

	@Field()
	@Column()
	status: string

	@Field()
	@Column()
	averageRating: number

	@Field()
	@Column()
	image: string

	@Field()
	@Column()
	season: number

	@Field()
	@Column()
	DateRelease: Date

	@Field()
	@Column({ default: false })
	isAdult: boolean

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date
}

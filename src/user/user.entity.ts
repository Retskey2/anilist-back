import { Field, ObjectType } from '@nestjs/graphql'
import {
	UpdateDateColumn,
	CreateDateColumn,
	Entity,
	Column,
	PrimaryGeneratedColumn,
} from 'typeorm'

export enum UserRole {
	ADMIN = 'admin',
	EDITOR = 'editor',
	GUEST = 'guest',
}

@Entity({ name: 'user', schema: 'public' })
@ObjectType()
export class User {
	@Field()
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column({ unique: true })
	email: string

	@Field()
	@Column()
	password: string

	@Field()
	@Column({ unique: true })
	username: string

	@Field()
	@Column({ type: 'text', nullable: true })
	description: string

	@Field()
	@Column({
		name: 'avatar_path',
		nullable: true,
	})
	avatarPath: string

	@Field()
	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.GUEST,
	})
	role: UserRole

	@Field()
	@Column({
		name: 'social_link',
		nullable: true,
	})
	socialLink: string

	@Field()
	@Column({
		nullable: true,
	})
	country: string

	@Field()
	@Column({
		name: 'remember_token',
		nullable: true,
	})
	rememberToken: string

	@Field()
	@Column({ type: 'int', default: 0 })
	like: number

	@Field()
	@Column({
		name: 'is_verified',
		default: false,
	})
	isVerified: boolean

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date
}

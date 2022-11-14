import { registerEnumType } from '@nestjs/graphql'

export enum MediaType {
	FILM = 'FILM',
	TV_SERIAL = 'TV_SERIAL',
	OVA = 'OVA',
	MANGA = 'MANGA',
}

registerEnumType(MediaType, { name: 'MediaType' })

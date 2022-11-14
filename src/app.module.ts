import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getMysqlConfig } from './config/db.config'
import { MediaModule } from './media/media.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMysqlConfig,
		}),
		UserModule,
		AuthModule,
		MediaModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			debug: true,
			autoSchemaFile: 'scheme.gql',
			playground: true,
			context: ({ req }) => ({ cookies: req.cookies }),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

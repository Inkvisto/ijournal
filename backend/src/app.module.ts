import { GraphQLModule } from '@nestjs/graphql';
import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './posts/post.module';
import { AppResolver } from './resolvers/app.resolver';
import { DateScalar } from './common/scalars/date.scalar';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configs/config';
import { GraphqlConfig, MinioConfig } from './configs/config.interface';
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from './logging.middleware';
import { MinioClientModule } from './minio/minio-client.module';
import { MinioModule } from 'nestjs-minio-client';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './comments/comments.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaForeignKeyErrorFilter } from './common/exception-filters/not-found-exception.filter';
import { ScheduleModule } from '@nestjs/schedule';



@Module({
  imports: [
   MinioClientModule,
   ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()], // configure your prisma middleware
      },
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          installSubscriptionHandlers: true,
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile:
            graphqlConfig.schemaDestination || './src/schema.graphql',
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
          plugins:[graphqlConfig.apolloPlayground]
        };
      },
      inject: [ConfigService],
    }),

    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, DateScalar,
  {
    provide:APP_FILTER,
    useClass:PrismaForeignKeyErrorFilter
  }],
})
export class AppModule {}

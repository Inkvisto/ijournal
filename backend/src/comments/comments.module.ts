import { CacheModule, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentGateway } from './comments.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisConfig } from '../configs/config.interface';
@Module({
  imports:[CacheModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService: ConfigService)=> {
      const redisConfig = configService.get<RedisConfig>('redis')
      return{
      password:'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
      store:redisStore,
      host:redisConfig.host,
      port: redisConfig.port,
      ttl:120
      }
    }
  })],
  controllers: [CommentsController],
  providers: [CommentsService,CommentGateway]
})
export class CommentsModule {}

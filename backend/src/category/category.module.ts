import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services/auth.service';
import { CategoryService } from './category.service';
import { MinioClientService } from '../minio/minio-client.service';
import { MinioClientModule } from '../minio/minio-client.module';
import { MinioService } from 'nestjs-minio-client';

@Module({
  imports:[AuthModule,MinioClientModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}

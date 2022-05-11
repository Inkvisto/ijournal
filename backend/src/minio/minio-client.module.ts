import {  Module } from '@nestjs/common';


import { MinioClientService } from './minio-client.service';

import { FileUploadService } from './image-upload.service';
import { MinioClientController } from './minio-client.controller';
import { MinioModule, MinioService } from 'nestjs-minio-client';
import { MinioConfig } from '../configs/config.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../configs/config';


const minio = config().minio

@Module({

  imports: [
    ConfigModule,
    MinioModule.register({
      global:true,
      endPoint: minio.endpoint,
      port:minio.port,
      useSSL: false,
      accessKey: minio.accessKey,
      secretKey:  minio.secretKey,
    })
  ],
  providers: [MinioClientService,FileUploadService],
  controllers:[MinioClientController],
  exports:[MinioClientService]
})
export class MinioClientModule {}
  

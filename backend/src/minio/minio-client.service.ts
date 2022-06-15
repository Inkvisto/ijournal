import { Injectable, Logger, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';

import * as crypto from 'crypto'
import { BufferedFile } from '../models/file.model';
import { ConfigService } from '@nestjs/config';
import { MinioConfig } from '../configs/config.interface';
@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = 'ij-backend-images'

  public get client() {
    return this.minio.client;
  }


  constructor(
    private configService:ConfigService,
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');

    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: [
            's3:ListBucketMultipartUploads',
            's3:GetBucketLocation',
            's3:ListBucket',
          ],
          Resource: ['arn:aws:s3:::ij-backend-images'], // Change this according to your bucket name
        },
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: [
            's3:PutObject',
            's3:AbortMultipartUpload',
            's3:DeleteObject',
            's3:GetObject',
            's3:ListMultipartUploadParts',
          ],
          Resource: ['arn:aws:s3:::ij-backend-images/*'], // Change this according to your bucket name
        },
      ],
    };
  
    this.client.setBucketPolicy(
     this.baseBucket,
      JSON.stringify(policy),
      function (err) {
        if (err) throw err;

        console.log('Bucket policy set');
      },
    );
  
  
    
  }


  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
  
    
      const config = this.configService.get<MinioConfig>('minio')
    //if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
    //  throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    //}
    let temp_filename = Date.now().toString()
    let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData:any = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    let filename = hashedFileName + ext
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket,fileName,fileBuffer,metaData, function(err, res) {
      if(err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    })

    return {
      url: `${config.endpoint}:${config.port}/${config.bucket}/${filename}` 
    }
  }

  async delete(objectName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objectName, function(err) {
      if(err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
    })
  }


  async getImage(objectName:string,baseBucket:string=this.baseBucket){
    let size = 0
    
       return this.minio.client.getObject(baseBucket,objectName,(err,dataStream)=>{
        if (err) {
          return console.log(err)
        }
        dataStream.on('data', function(chunk) {
          size += chunk.length
        })
        dataStream.on('end', function() {
          console.log('End. Total size = ' + size)
        })
        dataStream.on('error', function(err) {
          console.log(err)
        })
       })
  }

  async getListObjects(bucketName:string){
    return this.minio.client.listObjects(bucketName)
  }
}
import { Injectable } from "@nestjs/common";
import { BufferedFile } from "../models/file.model";
import { MinioClientService } from "./minio-client.service";

@Injectable()
export class FileUploadService {
  constructor(
    private minioClientService: MinioClientService
  ) {}

  async uploadSingle(image: BufferedFile) {
    
    let uploaded_image = await this.minioClientService.upload(image)
  
        
    return {
      image_url: uploaded_image.url,
      message: "Successfully uploaded to MinIO S3"
    }
  }

  async getFile(objectName:string){
    return await this.minioClientService.getImage(objectName)
  }

  async getListObjects(bucketName:string){
    return await this.minioClientService.getListObjects(bucketName)
  }
}
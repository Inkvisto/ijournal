import { Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { BufferedFile } from "../models/file.model";
import { FileUploadService } from "./image-upload.service";
import { MinioClientService } from "./minio-client.service";

@Controller('file')
export class MinioClientController {
  constructor(
    private fileUploadService: FileUploadService,
  
  ) {}

  @Post('/single')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(
    @UploadedFile() image: BufferedFile
  ) {
  
    
    return await this.fileUploadService.uploadSingle(image)
  }

  @Get('/get')
  async getfile(@Query('name') objectName:string){
    return await this.fileUploadService.getFile(objectName)
  }
  
  @Get('/getListObjects')
  async getListObjects(@Query('name') name:string){
    const streamOfObjects = await this.fileUploadService.getListObjects(name)
    return streamOfObjects.on('data',(data)=>console.log(data))
    
  }

 
}
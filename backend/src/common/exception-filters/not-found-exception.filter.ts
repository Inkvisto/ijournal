import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";

export class DataNotFoundException extends NotFoundException {
    constructor(data:string, id:string) {
      super(`${data} by id ${id} not found`);
    }
  }
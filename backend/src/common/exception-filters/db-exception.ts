import { ArgumentsHost, Catch, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Request, Response } from 'express';
import { PrismaClientExceptionFilter } from "nestjs-prisma";



export class DatabaseException extends PrismaClientExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const prismaErrorCode = exception.code
        const prismaClientVersion = exception.clientVersion
        response
          .json({
            message:'Prisma Error',
            code:prismaErrorCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            clientVersion:prismaClientVersion
          });
      }
}
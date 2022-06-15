import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class InvalidDataProvidedExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        
    }
}
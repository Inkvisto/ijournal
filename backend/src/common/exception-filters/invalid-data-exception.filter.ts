import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class InvalidDataExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        
    }
}
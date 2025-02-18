import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientUnknownRequestError)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { status, message } = this.getExceptionDetails(exception);

    response.status(status).json({ message });
  }

  private getExceptionDetails(exception: unknown): { status: number; message: string } {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {

      if (exception.code === 'P2025') {
        return {
          status: HttpStatus.NOT_FOUND, 
          message: 'Registro não encontrado.',
        };
      }
      return {
        status: HttpStatus.BAD_REQUEST,
        message: this.mapPrismaError(exception),
      };
    }

    if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro desconhecido',
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception instanceof Error ? exception.message : 'Internal Server Error',
    };
  }

  private mapPrismaError(exception: Prisma.PrismaClientKnownRequestError): string {
    const errorMessages: Record<string, string> = {
      P2002: 'Já existe um registro com esses dados.',
      P2003: 'Referência inválida para outro registro.',
    };

    return errorMessages[exception.code] || 'Erro desconhecido';
  }
}

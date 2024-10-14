import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHelper {
  static generateError(message: string, statusCode: number) {
    return {
      message,
      statusCode,
    };
  }

  static handleError(error: any) {
    if (!error) {
      console.error('Unknown error occurred');
      throw new HttpException('Erro interno no servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (error instanceof HttpException) {
      console.error(`Error: ${error.message}`);
      throw error;
    } else {
      console.error(`Error: ${error.message || error}`);
      throw new HttpException(
        error.message || 'Internal server error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
export class ErrorHelper {
  static generateError(message: string, statusCode: number) {
    return {
      message,
      statusCode,
    };
  }

  static handleError(error: any) {
    console.error(error);
    return error;
  }
}

export class SuccessHelper {
  static generateSuccess(message: string, statusCode: number) {
    return {
      message,
      statusCode,
    };
  }

  static handleSuccess(data: any) {
    return data;
  }
}

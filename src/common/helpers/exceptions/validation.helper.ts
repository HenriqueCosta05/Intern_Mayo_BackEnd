import { User } from '@prisma/client';

export class ValidationHelper {
  // Aqui estarão contidos os métodos de validação de dados.

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isStrongPassword(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static isNonEmptyString(value: string): boolean {
    return value.trim().length > 0;
  }

  static isValidUser(user: User): boolean {
    return (
      this.isValidEmail(user.email) &&
      this.isStrongPassword(user.password) &&
      this.isNonEmptyString(user.username)
    );
  }

  static exists(user: User): boolean {
    return user !== null;
  }
}

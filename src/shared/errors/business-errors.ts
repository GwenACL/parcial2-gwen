/* eslint-disable prettier/prettier */
export function BusinessLogicException(message: string, type: number) {
    this.message = message;
    this.type = type;
  }
  
  export enum BusinessError {
    EMPTY_TITLE,
    NOT_FOUND,
    INCORRECT_DATE,
    NOT_EMPTY,
    WRONG_SIZE,
    EMPTY_SLOGAN,
    TOO_SHORT,
    INCORRECT_SIZE,
  }
  /* archivo: src/shared/errors/business-errors.ts */
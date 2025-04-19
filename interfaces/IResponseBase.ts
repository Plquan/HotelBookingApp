interface IError {
    message: string;
    errorDetail?: string;
  }
  export interface IResponseBase<T> {
    statusCode: number;
    isSuccess?: boolean;
    message?: string;
    data?: T;
    error?: IError | null;
  }
interface IError {
    message: string;
    errorDetail?: string;
  }
  export interface IResponseBase<T> {
    status: number;
    success?: boolean;
    message?: string;
    data?: T;
    error?: IError | null;
  }
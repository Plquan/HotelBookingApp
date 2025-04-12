export interface IRegisterRequestData {
    userName: string;
    email:string;
    phone:string;
    password:String;
}

export interface IConfirmEmailRequestData {
    email:string;
    code:string;
}
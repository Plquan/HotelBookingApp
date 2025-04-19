export interface ILoginRequestData {
    userName:string;
    password:string
}

export interface ILoginResponseData{
    accessToken:string;
    refreshToken:string
}
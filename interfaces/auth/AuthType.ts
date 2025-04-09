export interface ILoginRequestData {
    username: string;
    password: string;
  }
  
  export interface ILoginResponseData {
    accessToken: {
      token: string;
      expiresAt: string;
      expiresAtUtc: string;
    };
    userInfo: {
      username: string;
      fullName: string;
      role: {
        roleName: string;
        displayName: string;
      };
      userId: string;
    };
  }
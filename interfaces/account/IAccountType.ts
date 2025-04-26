export interface IUpdateProfileData {
    userName?: string | null;
    avatar?: string;
}

export interface IChangePasswordData {
    oldPassword: string;
    newPassword: string;
}
  
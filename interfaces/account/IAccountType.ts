export interface IUpdateProfileData {
    userName?: string | null;
    avatar?: string | null;
}

export interface IChangePasswordData {
    oldPassword: string;
    newPassword: string;
}
  
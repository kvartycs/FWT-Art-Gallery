export interface IRegisterProps {
  username: string;
  password: string;
  fingerprint: string;
}
export interface IAuthState {
  data: null | ITokens;
  status: string;
}
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

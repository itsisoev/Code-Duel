export interface IAuth {
  user: IUser;
  token: string;
}

export interface IUser {
  id: string;
  username: string;
}

export interface IDecodedToken {
  id: string;
  username: string;
  exp: number;
  iat: number;
}

export interface IUser {
  id: string;
  username: string;
}

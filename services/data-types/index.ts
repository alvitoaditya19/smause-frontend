
export interface UserTypes {
  _id: string;
  name: string;
  email: string;
  username: string;
  status: string;
  avatar: any;
  no: number;
}

export interface JWTPayloadTypes{
  user:UserTypes,
  iat: number,
}

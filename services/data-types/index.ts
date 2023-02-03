
export interface UserStateTypes {
  _id: string;
  name: string;
  email: string;
  username: string;
  status: string;
  avatar: any;
  no: number;
}

export interface JWTPayloadTypes{
  user:UserStateTypes,
  iat: number,
}

export interface ControlTypes{
  lamp1: string;
  lamp2: string;
  pump1: string;
  pump2: string;
  valve: string;
  blend: string;
}

export interface SettingsTypes {
  _id: string;
  no: number;
  nameVegetable: string;
  amountVegetable: string;
  amountHarvest: string;
}
import { ParsedUrlQuery } from "querystring";
import { StringLiteral } from "typescript";

export interface UserStateTypes {
  id: string;
  name: string;
  email: string;
  username: string;
  status: string;
  avatar: any;
  no: number;
}
export interface UserStateEditTypes {
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
  status:string;
}

export interface SettingsTypes {
  id: string | ParsedUrlQuery;
  no: number;
  userId:string,
  name:string,
  nameVegetable: string;
  amountVegetable: string;
  amountHarvest: string;
}

export interface SettingsDataTypes {
  _id: string;
  no: number;
  nameVegetable: string;
  amountVegetable: string;
  amountHarvest: string;
}
export interface SettingsAllDataTypes {
  _id: string;
  no: number;
  name:string

  nameVegetable: string;
  amountVegetable: string;
  amountHarvest: string;
}


export interface LoginTypes {
  email: string;
  password: string;
}


export interface TemperatureDataTypes {
  id: string;
  no: number;
  celcius: string;
  humidity: string;
  time:string;
  date:string;
}
export interface TemperatureDataAllTypes {
  id: string;
  no: number;
  name:string;

  celcius: string;
  humidity: string;
  time:string;
  date:string;
}

export interface WaterDataTypes {
  id: string;
  no: number;
  ketinggianAir: string;
  oksigen: string;
  kekeruhanAir: string;
  time:string;
  date:string;
}

export interface WaterDataAllTypes {
  id: string;
  no: number;
  name:string;
  ketinggianAir: string;
  oksigen: string;
  kekeruhanAir: string;
  time:string;
  date:string;
}

export interface SoilDataTypes {
  id: string;
  no: number;
  kelembapanTanah: string;
  phTanah: string;
  time:string;
  date:string;
}

export interface SoilDataAllTypes {
  id: string;
  no: number;
  name:string;

  kelembapanTanah: string;
  phTanah: string;
  time:string;
  date:string;
}


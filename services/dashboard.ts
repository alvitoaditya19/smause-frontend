import axios from 'axios';
import callAPI from '../config/api';
import Cookies from 'js-cookie';
import { ParsedUrlQuery } from 'querystring';
import { ControlTypes, SettingsTypes, UserStateTypes } from './data-types';



const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

// export async function getAllDataUser() {
//   const url = `${ROOT_API}/${API_VERSION}/users`;

//   return callAPI({
//     url,
//     method: 'GET',
//     token: true,
//   });
// }
export async function GetUserData(currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/users?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getDetailUser(id:string | string[] | undefined) {
  const url = `${ROOT_API}/${API_VERSION}/users/${id}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function DestroyUser( id:string | string[] | undefined) {

  const url = `${ROOT_API}/${API_VERSION}/users/delete/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });

}

export async function SetAddUser(data:Partial<UserStateTypes>) {
  const url = `${ROOT_API}/${API_VERSION}/users/create`;

  return callAPI({
    url,
    method: 'POST',
    token: true,

    data,
  });
}

export async function SetEditUser(data:Partial<UserStateTypes>, id:string | string[] | undefined) {
  const url = `${ROOT_API}/${API_VERSION}/users/edit/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    token: true,
    data,
  });
}

export async function GetControl(userId:Partial<String>) {
  const url = `${ROOT_API}/${API_VERSION}/controls/${userId}`;

  return callAPI({
    url,
    method: 'GET',
    token:true,
  });
}

export async function SetControl(data :Partial<ControlTypes>,userId:Partial<String>) {
  const url = `${ROOT_API}/${API_VERSION}/controls/${userId}`;

  return callAPI({
    url,
    method: 'PUT',
    token:true,
    data,
  });
}

export async function GetAirsEnc(userId:Partial<String>, currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/temperatures/encrypt/${userId}?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
export async function GetAllAirsEnc( currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/temperatures/all?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function GetWatersEnc(userId:Partial<String>,currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/waters/encrypt/${userId}?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function GetAllWatersEnc(currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/waters/all?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function GetSoilsEnc(userId:Partial<String>, currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/soils/encrypt/${userId}?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
export async function GetAllSoilsEnc(currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/soils/all?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
export async function GetAllDataTemperature() {
  const URL = `temperatures`;

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getAllDataSetting(userId:Partial<String>,currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/settings/${userId}?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
export async function getAllDataUserSetting(currentPage:Partial<number>, limit:Partial<number>) {
  const url = `${ROOT_API}/${API_VERSION}/settings/all?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getDetailSetting(userId:any,id:string | string[] | undefined) {
  const url = `${ROOT_API}/${API_VERSION}/settings/${userId}/${id}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function SetAddSetting(data: Partial<SettingsTypes>) {
  const url = `${ROOT_API}/${API_VERSION}/settings/create`;

  return callAPI({
    url,
    method: 'POST',
    token: true,
    data,
  });
}

export async function SetEditSetting(userId:Partial<String>,data:Partial<SettingsTypes>, id:string | string[] | undefined) {
  const url = `${ROOT_API}/${API_VERSION}/settings/edit/${userId}/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    token: true,
    data,
  });
}

export async function DestroySetting(id: string) {

  const url = `${ROOT_API}/${API_VERSION}/settings/delete/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });

}

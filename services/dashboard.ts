import axios from 'axios';
import callAPI from '../config/api';
import Cookies from 'js-cookie';
import { ParsedUrlQuery } from 'querystring';
import { ControlTypes, SettingsTypes, UserStateTypes } from './data-types';



const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getAllDataUser() {
  const url = `${ROOT_API}/${API_VERSION}/users`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
export async function getCustomDataUser(token:string, limit:number, currentPage:number) {
  const url = `${ROOT_API}/${API_VERSION}/users?page=${currentPage}&limit=${limit}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getDetailUser(id:string | string[] | undefined) {
  const URL = `users/${id}`;

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
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

export async function GetControl() {
  const url = `${ROOT_API}/${API_VERSION}/controls`;

  return callAPI({
    url,
    method: 'GET',
    token:true,
  });
}

export async function SetControl(data :Partial<ControlTypes>) {
  const url = `${ROOT_API}/${API_VERSION}/controls`;

  return callAPI({
    url,
    method: 'PUT',
    token:true,
    data,
  });
}

export async function GetAirsEnc() {
  const url = `${ROOT_API}/${API_VERSION}/temperatures/encrypt`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function GetWatersEnc() {
  const url = `${ROOT_API}/${API_VERSION}/waters/encrypt`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function GetSoilsEnc() {
  const url = `${ROOT_API}/${API_VERSION}/soils/encrypt`;

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

export async function getAllDataSetting() {
  const url = `${ROOT_API}/${API_VERSION}/settings`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getDetailSetting(id: ParsedUrlQuery) {
  const url = `${ROOT_API}/${API_VERSION}/settings/${id}`;

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

export async function SetEditSetting(data:Partial<SettingsTypes>, id:ParsedUrlQuery) {
  const url = `${ROOT_API}/${API_VERSION}/settings/edit/${id}`;

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

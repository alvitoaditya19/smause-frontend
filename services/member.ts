import callAPI from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';


export async function updateProfile(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/users/profile/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}

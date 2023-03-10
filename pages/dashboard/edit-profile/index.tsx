import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';

import { useRouter } from 'next/router';

import { JWTPayloadTypes, UserStateTypes } from '../../../services/data-types';
import { updateProfile } from '../../../services/member';
import { Header, Sidebar } from '../../../components';
import Input from '../../../components/atoms/Input';
import Link from 'next/link';

const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

interface UserLoginStateTypes {
  _id: string;
  name: string;
  username: string;
  email: string;
  password:string;
  avatar: any;
}

export interface JWTPayloadEditTypes{
  user:UserLoginStateTypes,
  iat: number,
}

export default function EditProfile() {
  const [user, setUser] = useState<UserLoginStateTypes>({
    _id: '',
    name: '',
    email: '',
    avatar: '',
    password:'',
    username: '',
  });
  const [imagePreview, setImagePreview] = useState('/');
  const router = useRouter();

  const [toggleViewMode, setToggleViewMode] = useState(false);

  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };


  useEffect(() => {
    socket.on('dataMessaage', (data) => {
      toast.error(`Nilai : ${data.nilai} | ${data.message}!!!!!!!`,{
        theme: "colored",
      });
    });
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadEditTypes = jwtDecode(jwtToken);
      const userFromPayload: UserLoginStateTypes = payload.user;

      if (userFromPayload.avatar == "") {
        setImagePreview("/images/img_profile.png")
      }
      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();

    data.append('image', user.avatar);
    data.append('name', user.name);
    data.append('username', user.username);
    if(user.password !== undefined){
     data.append('password', user.password);
    }


    const response = await updateProfile(data, user._id);
    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove('token');
      router.push('/sign-in');
    }
  };
  return (
    <div className="container">
      <div className=" flex h-screen">
        <div className="m-auto">
          <section className="edit-profile">
            <div className="bg-card lg:p-8 p-6 ">
              <form action="">
                <div className="photo flex justify-center">
                  <div className="image-upload">
                    <label htmlFor="avatar">
                      {imagePreview === '/' ? (
                        <img src={user.avatar} alt="icon upload" width={110} height={110} style={{ borderRadius: '100%' }} />
                      ) : (
                        <img src={imagePreview} alt="icon upload" width={110} height={110} style={{ borderRadius: '100%' }} />
                      )}
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      onChange={(event) => {
                        const img = event.target.files![0];
                        setImagePreview(URL.createObjectURL(img));
                        return setUser({
                          ...user,
                          avatar: img,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="lg:pt-1">
                  <Input
                    label="Nama"
                    
                    value={user.name}
                    onChange={(event) => setUser({
                      ...user,
                      name: event.target.value,
                    })}
                  />
                </div>

                <div className="lg:pt-8 pt-6">
                  <Input
                    label="Email"
                    
                    status={true}
                    value={user.email}
                    onChange={(event) => setUser({
                      ...user,
                      email: event.target.value,
                    })}
                  />
                </div>
                <div className="lg:pt-8 pt-6">
                  <Input
                    label="Username"
                    
                    value={user.username}
                    onChange={(event) => setUser({
                      ...user,
                      username: event.target.value,
                    })}
                  />
                </div>
                <div className="lg:pt-8 pt-6 lg:pb-8 pb-6">
                  <Input
                    label="Password"
                    typeInput={true}
                    onChange={(event) => setUser({
                      ...user,
                      password: event.target.value,
                    })}
                  />
                </div>

                <div className="button-group d-flex flex-column">
                  <button
                    type="button"
                    className="btn btn-save font-medium text-lg text-white rounded-full"
                    onClick={onSubmit}
                  >
                    Simpan Profile Ku
                  </button>

                  <Link href="/dashboard" legacyBehavior>
                    <a
                      className="btn btn-go-home font-medium text-lg text-black rounded-full bg-background4 lg:mt-6"
                      role="button"
                    >
                      Halaman Dashboard
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

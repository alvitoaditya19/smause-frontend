import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header, Sidebar } from "../../../../components";
import { SetAddUser } from "../../../../services/dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';

import { JWTPayloadTypes, UserStateTypes } from "../../../../services/data-types";
import jwtDecode from "jwt-decode";

interface UserDataStateTypes {
  user: UserStateTypes;
}

const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function AddUser(props: UserDataStateTypes) {
  const { user } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };
  const router = useRouter();

  const onSubmit = async () => {
    const data = {
      name: name,
      email: email,
      username: username,
      password: password,
      phoneNumber:phoneNumber,
    };

    const response = await SetAddUser(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Berhasil Menambahkan Data User");

      router.push("/dashboard/pengguna");
    }
  };

  useEffect(() => {
    socket.on('dataMessaage', (data) => {
      toast.error(`Nilai : ${data.nilai} | ${data.message}!!!!!!!`,{
        theme: "colored",
      });
    });
  });

  return (
    <>
      {/* Navbar */}
      <div className="dashboard flex">
      {
          user.status == "admin" ? <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengguna"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengguna"
          />
        }
        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} />
          <section className="px-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Tambah Pengguna</h3>
              <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
            </div>
          </section>
    
          <div className="form-data-user mt-8 mb-4">
            <div className="form-label-input">
              <label
                htmlFor="name"
                className="form-label text-lg font-medium text-black mb-3"
              >
                Nama
              </label>
              <input
                type="text"
                className="form-control text-lg form-user-control"
                value={name}
                placeholder="Masukkan nama kamu"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-label-input mt-8">
              <label
                htmlFor="email"
                className="form-label text-lg font-medium text-black mb-4"
              >
                Alamat Email
              </label>
              <input
                type="email"
                className="form-control text-lg form-user-control"
                value={email}
                placeholder="Masukkan alamat email kamu"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-label-input  mt-8">
              <label
                htmlFor="username"
                className="form-label text-lg font-medium text-black mb-4"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control text-lg form-user-control"
                value={username}
                placeholder="Masukkan username kamu"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-label-input  mt-8">
              <label
                htmlFor="password"
                className="form-label text-lg font-medium text-black mb-4"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control text-lg form-user-control"
                value={password}
                placeholder="Masukkan password kamu"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-label-input  mt-8">
              <label
                htmlFor="Nomor Handphone"
                className="form-label text-lg font-medium text-black mb-4"
              >
                Nomor Handphone
              </label>
              <input
                type="number"
                className="form-control text-lg form-user-control"
                value={phoneNumber}
                placeholder="Masukkan nomor handphone kamu"
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>

            <div className="mt-8 d-flex flex-row-reverse">
              <button
                type="button"
                className="btn font-medium text-lg text-white bg-primary1 rounded-full px-5"
                onClick={onSubmit}
              >
                Tambah Pengguna
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string,
    }
  }
}



export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);

  const userFromPayload = payload.user;
  if (userFromPayload.status !== "admin") {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  return {
    props: {
      user: userFromPayload,
    },
  };
}

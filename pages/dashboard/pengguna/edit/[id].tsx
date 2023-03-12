// alt + shift + O

import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';

import { sentenceCase } from "sentence-case";
import { Header, Sidebar } from "../../../../components";
import { getDetailUser, SetEditUser } from "../../../../services/dashboard";
import { JWTPayloadTypes, UserStateTypes } from "../../../../services/data-types";

interface UserDataStateTypes {
  user: UserStateTypes;
}

const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function DetailEdit(props: UserDataStateTypes) {
  const { user } = props;
  
  const router = useRouter();
  const { id }: ParsedUrlQuery = router.query;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [numberPhone, setNumberPhone] = useState("");


  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "petani", label: "Petani" },

  ];

  const handleChange = (selectedOption: any) => {
    setStatus(selectedOption.value);
  };

  const onSubmit = async () => {
    const data: Partial<UserStateTypes> = {
      name: name,
      email: email,
      username: username,
      status: status,
    };

    const response = await SetEditUser(data, id);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Berhasil Edit Data User");

      router.push("/dashboard/pengguna");
    }
  };
  const colourStyles = {
    menuList: (styles: any) => ({
      ...styles,
      background: "#E7EAF5",
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isSelected ? "#174AFF" : undefined,
      zIndex: 1,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 100,
    }),
  };

  const fetchData = async () => {
    const data = await getDetailUser(id)
    setName(data.data.name)
    setEmail(data.data.email)
    setUsername(data.data.username)
    setNumberPhone(data.data.phoneNumber)
    setStatus(data.data.status)
  }

  useEffect(() => {
    socket.on('dataMessaage', (data) => {
      toast.error(`Nilai : ${data.nilai} | ${data.message}!!!!!!!`,{
        theme: "colored",
      });
    });
    if (!id) {
      return;
    }
    fetchData()
  }, [id]);

  return (
    <>
      <div className="dashboard d-flex">
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
        <div className="content">
          <Header toggleNavbar={toggleNavbar} />
          <section className="p-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Edit User</h3>
              <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
            </div>
          </section>
          <div className="form-data-user">
            <div className="form-label-input">
              <label
                htmlFor="name"
                className="form-label text-lg font-medium text-black mb-3"
              >
                Name
              </label>
              <input
                type="text"
                className="form-control text-lg form-user-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-label-input mt-8">
              <label
                htmlFor="email"
                className="form-label text-lg font-medium text-black mb-3 "
              >
                Email Address
              </label>
              <input
                type="email"
                className="form-control text-lg form-user-control email"
                value={email}
                disabled
              />
            </div>
            <div className="form-label-input  mt-8">
              <label
                htmlFor="username"
                className="form-label text-lg font-medium text-black mb-3"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control text-lg form-user-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-label-input  mt-8">
              <label
                htmlFor="username"
                className="form-label text-lg font-medium text-black mb-3"
              >
                Nomor Handphone
              </label>
              <input
                type="text"
                className="form-control text-lg form-user-control"
                value={numberPhone}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-label-input  mt-8">
              <label
                htmlFor="status"
                className="form-label text-lg font-medium text-black mb-3"
              >
                Status
              </label>
              <Select
                styles={colourStyles}
                value={{
                  value: status,
                  label: sentenceCase(status),
                }}
                onChange={handleChange}
                options={options}
                className="form-user-control"
              />
            </div>
            <div className="mt-8 d-flex flex-row-reverse">
              <button
                type="button"
                className="btn font-medium text-lg text-white bg-primary1 rounded-full px-5"
                onClick={onSubmit}
              >
                Edit User
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

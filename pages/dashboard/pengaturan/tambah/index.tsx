import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';
import { Header, Sidebar } from "../../../../components";
import { SetAddSetting } from "../../../../services/dashboard";

import jwtDecode from "jwt-decode";
import { JWTPayloadTypes, SettingsTypes, UserStateTypes } from "../../../../services/data-types";

interface UserDataStateTypes {
  user: UserStateTypes;
}
const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function AddVegetable(props: UserDataStateTypes) {
  const { user } = props;
  
  const [nameVegetable, setNameVegetable] = useState("");
  const [amountVegetable, setAmountVegetable] = useState("");
  const [amountHarvest, setAmountHarvest] = useState("");


  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };
  const router = useRouter();

  const onSubmit = async () => {
    const data : Partial<SettingsTypes> = {
      nameVegetable: nameVegetable,
      amountVegetable: amountVegetable,
      amountHarvest: amountHarvest,
    };

    const response = await SetAddSetting(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Berhasil Menambahkan Data Sayuran");

      router.push("/dashboard/pengaturan");
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
            activeMenu="Pengaturan"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengaturan"
          />
        }
        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} imageProfile = {user.avatar}  name={user.name} />
          <section className="px-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Tambah Sayuran</h3>
              <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
            </div>
          </section>
    
          <div className="form-data-user mt-8 mb-4">
            <div className="form-label-input">
              <label
                htmlFor="name"
                className="form-label text-lg font-medium text-black mb-3"
              >
                Nama Sayuran
              </label>
              <input
                type="text"
                className="form-control text-lg form-user-control"
                value={nameVegetable}
                placeholder="Masukkan nama sayuran"
                onChange={(event) => setNameVegetable(event.target.value)}
              />
            </div>
            <div className="form-label-input mt-8">
              <label
                htmlFor="email"
                className="form-label text-lg font-medium text-black mb-4"
              >
                Jumlah Sayuran
              </label>
              <input
                type="number"
                className="form-control text-lg form-user-control"
                value={amountVegetable}
                placeholder="Masukkan jumlah sayuran"
                onChange={(event) => setAmountVegetable(event.target.value)}
              />
            </div>
            <div className="form-label-input  mt-8">
              <label
                htmlFor="username"
                className="form-label text-lg font-medium text-black mb-4"
              >
                Jumlah Panen Sayuran
              </label>
              <input
                type="number"
                className="form-control text-lg form-user-control"
                value={amountHarvest}
                placeholder="Masukkan jumlah panen sayuran"
                onChange={(event) => setAmountHarvest(event.target.value)}
              />
            </div>
           

            <div className="mt-8 d-flex flex-row-reverse">
              <button
                type="button"
                className="btn font-medium text-lg text-white bg-primary1 rounded-full px-5"
                onClick={onSubmit}
              >
                Tambah Sayuran
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
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  return {
    props: {
      user: userFromPayload,
    },
  };
}
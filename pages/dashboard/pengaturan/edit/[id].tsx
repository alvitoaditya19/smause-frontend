// alt + shift + O

import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header, Sidebar } from "../../../../components";
import { getDetailSetting, SetEditSetting } from "../../../../services/dashboard";
import { JWTPayloadTypes, SettingsTypes, UserStateTypes } from "../../../../services/data-types";

interface UserDataStateTypes {
  user: UserStateTypes;
}
export default function DetailEdit(props: UserDataStateTypes) {
  const { user } = props;

  const router = useRouter();
  const  id  : ParsedUrlQuery  = router.query;
 
  const [nameVegetable, setNameVegetable] = useState("");
  const [amountVegetable, setAmountVegetable] = useState("");
  const [amountHarvest, setAmountHarvest] = useState("");


  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };


  const onSubmit = async () => {
    const data : Partial<SettingsTypes> = {
      nameVegetable: nameVegetable,
      amountVegetable: amountVegetable,
      amountHarvest: amountHarvest,
    };

    const response = await SetEditSetting(data, id);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Berhasil Edit Data Sayuran");

      router.push("/dashboard/pengaturan");
    }
  };

  const fetchData = async () => {
    const data = await getDetailSetting(id.id)
    setNameVegetable(data.data.nameVegetable)
    setAmountVegetable(data.data.amountVegetable)
    setAmountHarvest(data.data.amountHarvest)
  }
  
  useEffect( () => {
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
            activeMenu="Pengaturan"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengaturan"
          />
        }
        <div className="content">
          <Header toggleNavbar={toggleNavbar} />
          <section className="p-3">
            <div className="header">
            <h3 className="text-3xl text-black font-bold">Edit Sayuran</h3>
                <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
            </div>
          </section>
          <div className="form-data-user">
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
                onChange={(event) => setNameVegetable(event.target.value)}
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
                type="number"
                className="form-control text-lg form-user-control"
                value={amountVegetable}
                onChange={(event) => setAmountVegetable(event.target.value)}
                
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
                type="number"
                className="form-control text-lg form-user-control"
                value={amountHarvest}
                onChange={(event) => setAmountHarvest(event.target.value)}
              />
            </div>
            <div className="mt-8 d-flex flex-row-reverse">
              <button
                type="button"
                className="btn font-medium text-lg text-white bg-primary1 rounded-full px-5"
                onClick={onSubmit}
              >
                Edit Sayuran
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
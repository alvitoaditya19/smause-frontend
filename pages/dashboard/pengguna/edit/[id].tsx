// alt + shift + O

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { sentenceCase } from "sentence-case";
import { Header, Sidebar } from "../../../../components";
import { getAllDataUser, getDataForUser, getDataUser, getDetailUser } from "../../../../services/dashboard";
import Cookies from "js-cookie";
import axios from "axios";

export interface UserStateTypes{
  _id: string;
  name: string;
  email: string;
  username: string;
  status: string;
  avatar: any;
  no: number;
}

// alt + shift + O


export default function DetailEdit() {
  const router = useRouter();
  const { id }  = router.query;
 
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
  ];

  const handleChange = (selectedOption:any) => {
    setStatus(selectedOption.value);
  };

  const onSubmit = async () => {
    const data = {
      name: name,
      email: email,
      username: username,
      status: status,
    };

    const response = await SetEditUser(data, dataUser._id);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Berhasil Edit Data User");

      router.push("/dashboard/user");
    }
  };
  const colourStyles = {
    menuList: (styles:any) => ({
      ...styles,
      background: "#E7EAF5",
    }),
    option: (styles :any, { isFocused, isSelected }:any) => ({
      ...styles,
      background: isSelected ? "#4D17E2" : undefined,
      zIndex: 1,
    }),
    menu: (base :any) => ({
      ...base,
      zIndex: 100,
    }),
  };

  const fetchData = async () => {
    const data = await getDetailUser(id)
    console.log("datakuuu", data)
    setName(data.name)
    setEmail(data.email)
    setUsername(data.username)
    setNumberPhone(data.phoneNumber)
    setStatus(data.status)
  }
  
  useEffect( () => {
    if (!id) {
      return;  
    }
    fetchData()
  }, [id]);

  return (
    <>
      {/* Navbar */}
      <div className="dashboard d-flex">
        <Sidebar
          toggleViewMode={toggleViewMode}
          toggleNavbar={toggleNavbar}
          activeMenu="user"
        />
        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} />
          {/* <input id="search-box" onChange={filterBySearch} /> */}
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
                }} // default value must be like this./You forgot pass this  parameter
                onChange={handleChange}
                options={options}
                className="form-user-control"
              />
            </div>
            <div className="mt-8 d-flex flex-row-reverse">
              <button
                type="button"
                className="btn font-medium text-lg bg-primary1 text-white"
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



// export default function DetailUser () {
//   const router = useRouter();
//   const { id } = router.query;


//   useEffect(() => {
//     if (!id) {
//       return;  // NOTE: router.query might be empty during initial render
//     }
//     console.log("id aku", id)

//   }, [id]);
 


//   return (
 
//     <div>ss</div>
//   )
// }

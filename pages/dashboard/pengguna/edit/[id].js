// alt + shift + O

import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sentenceCase } from "sentence-case";
import { Header, Sidebar } from "../../../../components";
import {
  getDataUser,
  getDetailUser,
  SetEditUser,
} from "../../../../services/dashboard";

export default function DetailEdit({ dataUser }) {
  const [name, setName] = useState(dataUser.name);
  const [email, setEmail] = useState(dataUser.email);
  const [username, setUsername] = useState(dataUser.username);
  const [status, setStatus] = useState(dataUser.status);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const handleChange = (selectedOption) => {
    setStatus(selectedOption.value);
  };
  const router = useRouter();

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
    menuList: (styles) => ({
      ...styles,
      background: "#ffffff",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isSelected ? "#4D17E2" : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

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
              <h3>Edit User</h3>
              <p>Manage data for growth</p>
            </div>
          </section>
          <div className="form-data-user">
            <div className="form-label-input">
              <label
                htmlFor="name"
                className="form-label text-lg fw-medium color-palette-1 mb-10"
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
            <div className="form-label-input mt-30">
              <label
                htmlFor="email"
                className="form-label text-lg fw-medium color-palette-1 mb-10"
              >
                Email Address
              </label>
              <input
                type="email"
                className="form-control text-lg form-user-control"
                value={dataUser.email}
                disabled
              />
            </div>
            <div className="form-label-input  mt-30">
              <label
                htmlFor="username"
                className="form-label text-lg fw-medium color-palette-1 mb-10"
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
            <div className="form-label-input  mt-30">
              <label
                htmlFor="status"
                className="form-label text-lg fw-medium color-palette-1 mb-10"
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
            <div className="mt-30 d-flex flex-row-reverse">
              <button
                type="button"
                className="btn fw-medium text-lg color-pallete-1 text-white"
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

export async function getStaticPaths() {
  const data = await getDataUser();
  const paths = data.map((item) => ({
    params: {
      id: item._id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const data = await getDetailUser(id);
  return {
    props: {
      dataUser: data,
    },
  };
}

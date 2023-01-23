import { useRouter } from "next/router";
import { useState } from "react";
import { Header, Sidebar } from "../../../../components";
import { SetAddUser } from "../../../../services/dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    };

    const response = await SetAddUser(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Berhasil Menambahkan Data User");

      router.push("/dashboard/user");
    }
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
              <h3>Add User</h3>
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
                placeholder="Enter user name"
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
                value={email}
                placeholder="Enter user email address"
                onChange={(event) => setEmail(event.target.value)}
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
                placeholder="Enter username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-label-input  mt-30">
              <label
                htmlFor="password"
                className="form-label text-lg fw-medium color-palette-1 mb-10"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control text-lg form-user-control"
                value={password}
                placeholder="Enter user password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mt-30 d-flex flex-row-reverse">
              <button
                type="button"
                className="btn fw-medium text-lg color-pallete-1 text-white"
                onClick={onSubmit}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

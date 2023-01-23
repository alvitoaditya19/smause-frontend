import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { Header, Sidebar } from "../../../components";

export default function Settings() {
  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };
  return (
    <>
    {/* Navbar */}
    <div className="dashboard d-flex">
      <Sidebar
        toggleViewMode={toggleViewMode}
        toggleNavbar={toggleNavbar}
        activeMenu="setting"
      />
      {/* Main Content */}
      <div className="content">
        <Header toggleNavbar={toggleNavbar}/>
        {/* <input id="search-box" onChange={filterBySearch} /> */}
        <section className="p-3">
          <div className="header">
            <h3>Setting</h3>
            <p>Manage data for growth</p>
          </div>
        </section>

        <div className="row m-2 justify-content-center">
        <label
          htmlFor="email"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
          <input
            type="password"
            className="form-control rounded-pill text-lg"
            placeholder="Your password"
            // value={password}
            // onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>
    </div>
  </>
  )
}

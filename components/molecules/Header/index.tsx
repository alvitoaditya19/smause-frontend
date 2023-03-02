import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from "next/link";

export interface  HeaderProps {
  toggleNavbar: MouseEventHandler<HTMLButtonElement>;
  filterBySearch: ChangeEventHandler<HTMLInputElement>;
  isFilter: boolean;
  name:string
}

export default function Header({ toggleNavbar, filterBySearch, isFilter, name }:Partial<HeaderProps>) {
  const [filter, setFilter] = useState(false);
  const router = useRouter();

  let search;
  let searchResponsive;

  if (isFilter) {
    search = (
        <div className="lg:flex justify-end  hidden mr-4">
          <input
            type="text"
            placeholder="Search report or product"
            className="search form-control"
            onChange={filterBySearch}
          />
          <button
            className="btn btn-search flex justify-center items-center p-0"
            type="button"
          >
            <img src="/Icon/ic_search.svg" width="20px" height="20px" />
          </button>
        </div>  
    );

    searchResponsive = (
        <div className="justify-end lg:hidden flex mb-4 mt-3">
          <input
            type="text"
            placeholder="Search report or product"
            className="search form-control block"
            onChange={filterBySearch}
          />
          <button
            className="btn btn-search flex justify-center items-center p-0"
            type="button"
          >
            <img src="/Icon/ic_search.svg" width="20px" height="20px" />
          </button>
        </div>    
    );
  } else{
    search=<div>
      <h1></h1>
    </div>
  }

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid gap-2 p-0">
          <button
            className="btn icon-bar sidebarCollapse"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="search-bar-profile gap-md-4 mt-3 mt-md-0 font-medium">
            {search}
            {
              !isFilter ? <h1 className="truncate lg:w-full w-24">Hi, {name}</h1> :""
            }
            <div className="dropdown">
              <button
                className="profile-pictures ml-0"
                type="button"
                id="dropdownProfile1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/images/img_profile.png"
                  alt="Photo Profile"
                  className="avatar "
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-center"
                aria-labelledby="dropdownProfile1"
              >
                <Link href="/dashboard" legacyBehavior>
                  <a className="dropdown-item text-black" href="#">
                    Dashboard
                  </a>
                </Link>
                <Link  href="/dashboard/edit-profile" legacyBehavior>
                  <a className="dropdown-item text-black" href="#">
                    Edit Profile
                  </a>
                </Link>
                <Link  href="/dashboard/bantuan" legacyBehavior>
                  <a className="dropdown-item text-black" href="#">
                    Bantuan
                  </a>
                </Link>
                <li>
                  <div  className="divider"></div>
                </li>
                <li onClick={onLogout}>
                  <a className="dropdown-item text-black" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </nav>
        <div className="">
          {searchResponsive}
        </div>
    </>
  );
}

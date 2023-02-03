import axios from "axios";

import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { Header, Sidebar } from "../../../components";
import Image from "next/image";
import { DestroySetting, getAllDataSetting } from "../../../services/dashboard";
import { SettingsTypes } from "../../../services/data-types";

export default function Setting() {
    const [isLoading, setIsLoading] = useState(false);
  
    const [toggleViewMode, setToggleViewMode] = useState(false);
    const toggleNavbar = () => {
      setToggleViewMode(!toggleViewMode);
    };
    const [items, setItems] = useState([]);
  
    const [pageCount, setpageCount] = useState(0);
    
  
    let limit = 10;
    let no = 0;
    let statusUser = "admin";
  
    useEffect(() => {
      const getContent = async () => {
        setIsLoading(true);
        const data = await getAllDataSetting();
        setIsLoading(false);
        setItems(data.data.data);
      };
  
      getContent();
    }, [limit]);
    const fetchComments = async (currentPage:any) => {
      const res = await fetch(
        // `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
        `http://localhost:3000/api/v1/users/?limit=${limit}`
      );
      const data = await res.json();
      return data;
    };
  
    const handlePageClick = async (data:string) => {
      // console.log(data.selected);
  
      let currentPage = data.selected + 1;
  
      const commentsFormServer = await fetchComments(currentPage);
  
      setItems(commentsFormServer);
      // scroll to the top
      //window.scrollTo(0, 0)
    };
  
    const filterBySearch = (event:React.ChangeEvent<HTMLInputElement>) => {
      // Access input value
      const query = event.target.value;
      // Create copy of item list
      axios
        .get(`http://localhost:3000/api/v1/users/?limit=${limit}`)
        .then((res) => {
          console.log("DATAAA: ", res.data.data);
          let updatedList : any = [...res.data.data];
          // Include all elements which includes the search query
          updatedList = updatedList.filter((item: any) => {
            return (
              item.name.toString().toLowerCase().indexOf(query.toLowerCase()) !==
              -1
            );
          });
          setItems(updatedList);
        });
    };
  
    const deleteSetting = async (id:string) => {
      DestroySetting(id);
      const user  = await getAllDataSetting();
      setItems(user.data.data);
    };
    return (
      <>
        {/* Navbar */}
        <div className="dashboard d-flex">
          <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengaturan"
          />
          {/* Main Content */}
          <div className="content">
            <Header toggleNavbar={toggleNavbar} filterBySearch={filterBySearch} isFilter/>
            {/* <input id="search-box" onChange={filterBySearch} /> */}
            <section className="px-3">
              <div className="header">
                <h3 className="text-3xl text-black font-bold">Pengaturan</h3>
                <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              </div>
            </section>
            <section className="mt-8 mb-10">
              <div className="container-fluid lg:flex lg:justify-between flex-none justify-start">
                
                <Link href="/dashboard/pengaturan/tambah" legacyBehavior>
                  <div className="btn bg-primary1 border-0 text-white rounded-full lg:inline block px-5">Tambah Pengguna</div>
                </Link>
                <div className="lg:flex">
                  <Link href="/dashboard/user/add-user" legacyBehavior>
                    <div className="btn bg-primary1 border-0 text-white lg:mr-4 mr-0 lg:my-0 my-3 rounded-full px-5 lg:inline block">File CSV (Data Enkripsi)</div>
                  </Link>
                  <Link href="/dashboard/user/add-user" legacyBehavior>
                    <div className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block">File CSV (Data Asli)</div>
                  </Link>
                </div>
              </div>
            </section>
  
            <div className="m-2">
              {isLoading ? (
                <ReactLoading
                  type="spinningBubbles"
                  color="#4D17E2"
                  height={667}
                  width={375}
                  // className="justify-content-center text-center"
                />
              ) : (
                <div className="table-responsive-lg">
                  <table className="table table-borderless table-data">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Sayuran</th>
                        <th scope="col">Jumlah Sayuran</th>
                        <th scope="col">Jumlah Panen</th>
                        <th scope="col">Aksi</th>

                      </tr>
                    </thead>
  
                    <tbody>
                      {items.map((item:SettingsTypes) => {
                        return (
                          <tr key={item._id} className="align-items-center">
                            <td>{item.no}</td>
                            <td>{item.nameVegetable}</td>
                            <td>{item.amountVegetable}</td>
                            <td>{item.amountHarvest}</td>
                            <td>
                              <Link href={`/dashboard/pengaturan/edit/${item._id}`} legacyBehavior>
                                <a className="btn-edit-user">Edit</a>
                              </Link>
  
                              <button
                                onClick={() => deleteSetting(item._id)}
                                className="btn-delete-user"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {/* {items.map((item) => {
            return (
              <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                  <div className="card-body">
                    <h5 className="card-title text-center h2">Id :{item.id} </h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {item.email}
                    </h6>
                    <p className="card-text">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })} */}
            </div>
  
            <ReactPaginate
              previousLabel={"previous"}
              
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </>
    );
  }
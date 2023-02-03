import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jwtDecode from "jwt-decode";
import Link from "next/link";

import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, Sidebar } from "../../../components";
import { GetAllDataTemperature, GetCustomDataTemperature, GetLimitDataTemperature } from "../../../services/dashboard";
import Cookies from "js-cookie";

export default function Air() {
  const [isLoading, setIsLoading] = useState(false);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [totalData, setTotalData] = useState(0);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;
  let no = 0;
  let statusUser = "admin";

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      axios
        .get(`https://randomuser.me/api/`)
        .then((res) => {
          setIsLoading(false);
          let data = res.data;
          console.log(data);
          // setItems(data.data);
        })
        .catch((err) => {
          console.log("err get in progress: ", err);
        });
    };

    getComments();
  }, [limit]);
  const fetchComments = async (currentPage: any) => {
    const res = await fetch(
      // `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
      `http://localhost:3000/api/v1/users/?limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data: string) => {
    // console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  const filterBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    axios
      .get(`http://localhost:3000/api/v1/users/?limit=${limit}`)
      .then((res) => {
        console.log("DATAAA: ", res.data.data);
        let updatedList = [...res.data.data];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
          return (
            item.name.toString().toLowerCase().indexOf(query.toLowerCase()) !==
            -1
          );
        });
        setItems(updatedList);
      });
  };
  const notifyDownload = () => toast.success("Berhasil download data Suhu");
  return (
    <>
      {/* Navbar */}
      <div className="dashboard d-flex">
        <Sidebar
          toggleViewMode={toggleViewMode}
          toggleNavbar={toggleNavbar}
          activeMenu="Tanah"
        />
        {/* Main Content */}
        <div className="content">
          <Header
            toggleNavbar={toggleNavbar}
            filterBySearch={filterBySearch}
            isFilter
          />
          {/* <input id="search-box" onChange={filterBySearch} /> */}
          <section className="p-3">
            <div className="header justify-between flex-row items-center">
              <div className="">
                <h3 className="text-3xl text-black font-bold">Tanah</h3>
                <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              </div>
              <h3 className="text-base text-grey2 mt-1">Total : {totalData}</h3>
            </div>
          </section>
          <section className="mt-4 mb-10">
            <div className="container-fluid lg:flex flex-none justify-start">
              <CSVLink
                data={allItems}
                className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block lg:mr-4 mr-0"
                filename={"Temperature-data.csv"}
                onClick={notifyDownload}
              >
                File CSV (Data Asli)
              </CSVLink>
              <CSVLink
                data={allItems}
                className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block lg:mt-0 mt-3"
                filename={"Temperature-data.csv"}
                onClick={notifyDownload}
              >
                File CSV (Data Enkripsi)
              </CSVLink>
            </div>
          </section>
          <div className="m-2 ">
            {isLoading ? (
              <div className="justify-center mx-auto flex">
                <ReactLoading
                  type="spinningBubbles"
                  color="#4D17E2"
                  height={667}
                  width={375}
                />
              </div>
            ) : (
              <div className="table-responsive-lg">
                <table className="table table-borderless table-data">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Celcius</th>
                      <th scope="col">Humidity</th>
                      <th scope="col">Time</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      return (
                        <tr key={item.id} className="align-items-center">
                          {item.id}
                          <td>{item.celcius}</td>
                          <td>{item.humidity}</td>
                          <td>{item.time}</td>
                          <td>{item.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
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

// export async function getServerSideProps({ req }) {
//   const { token } = req.cookies;
//   if (!token) {
//     return {
//       redirect: {
//         destination: "/sign-in",
//         permanent: false,
//       },
//     };
//   }

//   const jwtToken = Buffer.from(token, "base64").toString("ascii");
//   const payload = jwtDecode(jwtToken);

//   const userFromPayload = payload.user;
//   const IMG = process.env.NEXT_PUBLIC_IMG;
//   userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
//   return {
//     props: {
//       user: userFromPayload,
//     },
//   };
// }

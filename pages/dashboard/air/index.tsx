import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jwtDecode from "jwt-decode";

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

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      const token = Cookies.get("token");

      const jwtToken = atob(token);

      axios
        .get(
          `http://localhost:3000/api/v1/temperatures?page=1&limit=${limit}`,
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        )
        .then((res) => {
          setIsLoading(false);
          let dataTemperature = res.data;

          setpageCount(Math.ceil(dataTemperature.total / limit));
          setTotalData(dataTemperature.total);
          setItems(dataTemperature.data);
        })
        .catch((err) => {
          console.log("err get in progress: ", err);
        });
    };
    const getAllData = async () => {
      const token = Cookies.get("token");

      const allDataSuhu = await GetAllDataTemperature(token);
      setAllItems(allDataSuhu.data.data);
    };

    getAllData();

    getComments();
  }, []);
  const fetchComments = async (currentPage) => {
    const token = Cookies.get('token');

    const allDataSuhu = await GetCustomDataTemperature(token,limit,currentPage);

    return allDataSuhu.data.data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };

  const filterBySearch =async (event) => {
    const query = event.target.value;
    const token = Cookies.get("token");

    const jwtToken = atob(token);
    axios
      .get(`http://localhost:3000/api/v1/temperatures` , { headers: { Authorization: `Bearer ${jwtToken}`}})
      .then((res) => {
        let updatedList = [...res.data.data];

        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
          return (
            item.date.toString().toLowerCase().indexOf(query.toLowerCase()) !==
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
          activeMenu="temperature"
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
            <div className="header">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>Air</h3>
                  <p>Manage data for growth</p>
                </div>
                <h3>Total : {totalData}</h3>
              </div>
            </div>
          </section>
          <section className=" mb-20">
            <div className="container-fluid gap-2">
              <CSVLink
                data={allItems}
                className="btn color-pallete-1 border-0 text-white"
                filename={"Temperature-data.csv"}
                onClick={notifyDownload}
              >
                Download Data CSV
              </CSVLink>
            </div>
          </section>

          <div className="row m-2 justify-content-center">
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

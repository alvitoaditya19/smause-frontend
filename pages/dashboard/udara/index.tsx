import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jwtDecode from "jwt-decode";
import Link from "next/link";

import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JWTPayloadTypes, SoilDataTypes, TemperatureDataTypes, UserStateTypes } from "../../../services/data-types";
import { Header, Sidebar } from "../../../components";
import { GetAirsEnc } from "../../../services/dashboard";
import { createDecipheriv } from "crypto";

interface UserDataStateTypes {
  user: UserStateTypes;
}
export default function Udara(props: UserDataStateTypes) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };
  const [items, setItems] = useState([]);
  const [itemsEnc, setItemsEnc] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const [pageCount, setpageCount] = useState(0);

  let limit = 5;

  const cryptoAlgorithm = 'aes-128-cbc';
  const key = 'tugasakhir421654'; //16 karakter
  const iv = '4567123212343219'; //16 karakter

  const getValueAirs = useCallback(async () => {
    setIsLoading(true);
    const data: any = await GetAirsEnc(1,limit);
    const dataAirs = data.data.data

    setIsLoading(false);

    const dataMap = data.data.data.map((soilDataMap:any, index:any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm , key, iv);
      let decCelcius = dataDecipher1.update(soilDataMap.celcius,  'hex', 'utf8');
      decCelcius += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm , key, iv);
      let decHumidity = dataDecipher2.update(soilDataMap.humidity,  'hex', 'utf8');
      decHumidity += dataDecipher2.final('utf8');
    

      return {
        no: index + 1,
        id: soilDataMap.id,
        celcius: decCelcius,
        humidity:decHumidity,
        date: soilDataMap.date,
        time: soilDataMap.time
      };
    })
    setTotalData(data.data.total)
    setpageCount(Math.ceil(data.data.total / limit));

    setItemsEnc(dataAirs)
    setItems(dataMap);
  }, [GetAirsEnc]);

  useEffect(() => {
    getValueAirs();
  }, [limit]);

  
  const fetchComments = async (currentPage: any, limit:number) => {
    const data: any = await GetAirsEnc(currentPage,limit);

    const dataMap = data.data.data.map((soilDataMap:any, index:any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm , key, iv);
      let decCelcius = dataDecipher1.update(soilDataMap.celcius,  'hex', 'utf8');
      decCelcius += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm , key, iv);
      let decHumidity = dataDecipher2.update(soilDataMap.humidity,  'hex', 'utf8');
      decHumidity += dataDecipher2.final('utf8');

      return {
        no: index + 1,
        id: soilDataMap.id,
        celcius: decCelcius,
        humidity:decHumidity,
        date: soilDataMap.date,
        time: soilDataMap.time
      };
    })
    return dataMap;
  };

  const handlePageClick = async (data: any) => {
    let currentPage  = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage, limit);
    setItems(commentsFormServer);
  };

  const filterBySearch =async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const data: any = await GetAirsEnc(1, Infinity);
    
    let updatedList :any = [...data.data.data];

    let dataMap = updatedList.map((soilDataMap:any, index:any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm , key, iv);
      let decCelcius = dataDecipher1.update(soilDataMap.celcius,  'hex', 'utf8');
      decCelcius += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm , key, iv);
      let decHumidity = dataDecipher2.update(soilDataMap.humidity,  'hex', 'utf8');
      decHumidity += dataDecipher2.final('utf8');

      return {
        no: index + 1,
        id: soilDataMap.id,
        celcius: decCelcius,
        humidity:decHumidity,
        date: soilDataMap.date,
        time: soilDataMap.time
      };
    })

    dataMap = dataMap.filter((item:any) => {
      return (
        item.date.toString().toLowerCase().indexOf(query.toLowerCase()) !==
        -1
      );
    });
    setItems(dataMap);

  };
  const notifyDownload = () => toast.success("Berhasil download data udara");
  const notifyDownloadEnc = () => toast.success("Berhasil download data udara enkripsi");
 
  return (
    <>
      {/* Navbar */}
      <div className="dashboard d-flex">
      {
          user.status == "admin" ? <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Udara"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Udara"
          />
        }
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
                <h3 className="text-3xl text-black font-bold">Udara</h3>
                <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              </div>
              <h3 className="text-base text-grey2 mt-1">Total : {totalData}</h3>
            </div>
          </section>
          <section className="mt-4 mb-10">
            <div className="container-fluid lg:flex flex-none justify-start">
              <CSVLink
                data={items}
                className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block lg:mr-4 mr-0"
                filename={"Temperature-data.csv"}
                onClick={notifyDownload}
              >
                File CSV (Data Asli)
              </CSVLink>
              <CSVLink
                data={itemsEnc}
                className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block lg:mt-0 mt-3"
                filename={"Temperature-data.csv"}
                onClick={notifyDownloadEnc}
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
                    {items.map((item:TemperatureDataTypes) => {
                      return (
                        <tr key={item.id} className="align-items-center">
                                                    <td>{item.no} </td>                       
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

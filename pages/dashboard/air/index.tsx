import { createDecipheriv } from 'crypto';
import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";


import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, Sidebar } from "../../../components";
import { GetUserData, GetWatersEnc } from "../../../services/dashboard";
import { JWTPayloadTypes, UserStateTypes, WaterDataTypes } from "../../../services/data-types";
import io from 'socket.io-client';


interface UserDataStateTypes {
  user: UserStateTypes;
}
const host: any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function Air(props: UserDataStateTypes) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const [toggle, setToggle] = useState(false);

  const [items, setItems] = useState([]);
  const [itemsEnc, setItemsEnc] = useState([]);

  const [itemCSVs, setItemCSVs] = useState([]);
  const [itemEncCSVs, setItemEncCSVs] = useState([]);

  const [itemstable, setItemsTable] = useState([]);

  const [totalData, setTotalData] = useState(0);

  const [pageCount, setpageCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const [filteredItems, setFilteredItems] = useState([]);

  let limit = 5;

  const cryptoAlgorithm = 'aes-128-cbc';
  const key = 'tugasakhir421654'; //16 karakter
  const iv = '4567123212343219'; //16 karakter

  const submitToggle = async () => {
    if(toggle == true){
      setItemsTable(itemsEnc)
    }else if(toggle == false){
      setItemsTable(items)
    }
    setToggle(!toggle);
  }

  const getValueWaters = useCallback(async () => {
    setIsLoading(true);
    const data: any = await GetWatersEnc(user.id,1, limit);
    const dataConvertCSV: any = await GetWatersEnc(user.id,1, Infinity);

    const dataWaters = data.data.data

    setIsLoading(false);

    const dataMap = data.data.data.map((waterDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKetinngianAir = dataDecipher1.update(waterDataMap.ketinggianAir, 'hex', 'utf8');
      decKetinngianAir += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decOksigen = dataDecipher2.update(waterDataMap.oksigen, 'hex', 'utf8');
      decOksigen += dataDecipher2.final('utf8');

      const dataDecipher3 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKeruhAir = dataDecipher3.update(waterDataMap.kekeruhanAir, 'hex', 'utf8')
      decKeruhAir += dataDecipher3.final('utf8');

      return {
        no: index + 1,
        id: waterDataMap.id,
        ketinggianAir: decKetinngianAir,
        oksigen: decOksigen,
        kekeruhanAir: decKeruhAir,
        date: waterDataMap.date,
        time: waterDataMap.time
      };
    })

    const dataCSVMap =  dataConvertCSV.data.data.map((waterDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKetinngianAir = dataDecipher1.update(waterDataMap.ketinggianAir, 'hex', 'utf8');
      decKetinngianAir += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decOksigen = dataDecipher2.update(waterDataMap.oksigen, 'hex', 'utf8');
      decOksigen += dataDecipher2.final('utf8');

      const dataDecipher3 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKeruhAir = dataDecipher3.update(waterDataMap.kekeruhanAir, 'hex', 'utf8')
      decKeruhAir += dataDecipher3.final('utf8');

      return {
        no: index + 1,
        id: waterDataMap.id,
        ketinggianAir: decKetinngianAir,
        oksigen: decOksigen,
        kekeruhanAir: decKeruhAir,
        date: waterDataMap.date,
        time: waterDataMap.time
      };
    })
    setTotalData(data.data.total)
    setpageCount(Math.ceil(data.data.total / limit));

    setItemsEnc(dataWaters)
    setItems(dataMap);

    setItemsTable(dataMap)

    setItemCSVs(dataCSVMap)
    setItemEncCSVs(dataConvertCSV.data.data)
  }, [GetWatersEnc]);

  const fetchComments = async (currentPage: any, limit: number) => {
    const data: any = await GetWatersEnc(user.id,currentPage, limit);

    const dataMap = data.data.data.map((waterDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKetinngianAir = dataDecipher1.update(waterDataMap.ketinggianAir, 'hex', 'utf8');
      decKetinngianAir += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decOksigen = dataDecipher2.update(waterDataMap.oksigen, 'hex', 'utf8');
      decOksigen += dataDecipher2.final('utf8');

      const dataDecipher3 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKeruhAir = dataDecipher3.update(waterDataMap.kekeruhanAir, 'hex', 'utf8')
      decKeruhAir += dataDecipher3.final('utf8');

      return {
        no: index + 1,
        id: waterDataMap.id,
        ketinggianAir: decKetinngianAir,
        oksigen: decOksigen,
        kekeruhanAir: decKeruhAir,
        date: waterDataMap.date,
        time: waterDataMap.time
      };
    })
    return dataMap;
  };

  const handlePageClick = async (data: any) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage, limit);
   
    setItemsTable(commentsFormServer);
  };

  const filterBySearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const data: any = await GetWatersEnc(user.id,1, Infinity);

    let updatedList: any = [...data.data.data];

    let dataMap = updatedList.map((waterDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKetinngianAir = dataDecipher1.update(waterDataMap.ketinggianAir, 'hex', 'utf8');
      decKetinngianAir += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decOksigen = dataDecipher2.update(waterDataMap.oksigen, 'hex', 'utf8');
      decOksigen += dataDecipher2.final('utf8');

      const dataDecipher3 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKeruhAir = dataDecipher3.update(waterDataMap.kekeruhanAir, 'hex', 'utf8')
      decKeruhAir += dataDecipher3.final('utf8');

      return {
        no: index + 1,
        id: waterDataMap.id,
        ketinggianAir: decKetinngianAir,
        oksigen: decOksigen,
        kekeruhanAir: decKeruhAir,
        date: waterDataMap.date,
        time: waterDataMap.time
      };
    })

    dataMap = dataMap.filter((item: any) => {
      return (
        item.date.toString().toLowerCase().indexOf(query.toLowerCase()) !==
        -1
      );
    });
    setItemsTable(dataMap);

  };

    const handleInputChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
    filterItems(value);
  };

  const handleItemClick = async (item: any) => {
    setIsLoading(true);
    const dataWater: any = await GetWatersEnc(item.id, 1, Infinity);
    setIsLoading(false);
    const dataMapGraphWater = dataWater.data.data

    const dataMapKetiA = dataWater.data.data.slice(-1)[0]?.ketinggianAir ?? "30039b4d60c8126a163c1805ba1882fb"
    const dataMapOks = dataWater.data.data.slice(-1)[0]?.oksigen ?? "30039b4d60c8126a163c1805ba1882fb"
    const dataMapKeruhA = dataWater.data.data.slice(-1)[0]?.kekeruhanAir ?? "30039b4d60c8126a163c1805ba1882fb"


    // DATA AIR
    const dataDecipherWater1 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decKetinggianAir = dataDecipherWater1.update(dataMapKetiA, 'hex', 'utf8')
    decKetinggianAir += dataDecipherWater1.final('utf8');

    const dataDecipherWater2 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decOksigen = dataDecipherWater2.update(dataMapOks, 'hex', 'utf8')
    decOksigen += dataDecipherWater2.final('utf8');

    const dataDecipherWater3 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decKeruhAir = dataDecipherWater3.update(dataMapKeruhA, 'hex', 'utf8')
    decKeruhAir += dataDecipherWater3.final('utf8');

    const dataMapDecWater = dataMapGraphWater.map((watersDataMap: any, index: any) => {
      const dataDecipherWater1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKetinggianAir = dataDecipherWater1.update(watersDataMap.ketinggianAir, 'hex', 'utf8');
      decKetinggianAir += dataDecipherWater1.final('utf8');
    
      const dataDecipherWater2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decOksigen = dataDecipherWater2.update(watersDataMap.oksigen, 'hex', 'utf8');
      decOksigen += dataDecipherWater2.final('utf8');
    
      const dataDecipherWater3 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKeruhAir = dataDecipherWater3.update(watersDataMap.kekeruhanAir, 'hex', 'utf8');
      decKeruhAir += dataDecipherWater3.final('utf8');
    
      return {
        no: index + 1,
        id: watersDataMap.id,
        ketinggianAir: decKetinggianAir,
        oksigen: decOksigen,
        kekeruhanAir: decKeruhAir,
        date: watersDataMap.date,
        time: watersDataMap.time
      };
    }).slice(0, 4);

    

    setInputValue(item.name);
    setFilteredItems([]);
  

  };

  const filterItems = async (value: any) => {
    const data = await GetUserData(1, Infinity);
    const dataUsers = data.data.data.map((userItem: any) => {
      return {
        id: userItem._id,
        name: userItem.name,
      };
    });

    const filtered = dataUsers.filter((item: any) =>
      item.name.toLowerCase().includes(String(value).toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const notifyDownload = () => toast.success("Berhasil download data air");
  const notifyDownloadEnc = () => toast.success("Berhasil download data air enkripsi");

  useEffect(() => {
    socket.on('dataMessaage', (data) => {
      if (data.userId === user.id) {
        toast.error(`Nilai : ${data.data.nilai} | ${data.data.message}!!!!!!!`, {
          theme: "colored",
        });
      }
    });
    setToggle(true)

    getValueWaters();

  }, [limit]);

  return (
    <>
      {/* Navbar */}
      <div className="dashboard d-flex">
        {
          user.status == "admin" ? <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Air"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Air"
          />
        }
        {/* Main Content */}
        <div className="content">
          <Header
            toggleNavbar={toggleNavbar}
            filterBySearch={filterBySearch}
            isFilter
            imageProfile = {user.avatar} 
            placeHolder="Cari Data Sensor Air"

          />
          {/* <input id="search-box" onChange={filterBySearch} /> */}
          <section className="p-3">
            <div className="header justify-between flex-row items-center">
              <div className="">
                <h3 className="text-3xl text-black font-bold">Air</h3>
                <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              </div>
                            {
                  user.status === "admin" ? <div className="">
                    <h3 className="mb-2 text-xl text-black font-bold">Pencarian Data Petani</h3>
                    <div className="relative">
                      <input
                        type="search"
                        className="block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        id="exampleSearch"
                        placeholder="Ketikan nama petani"
                        value={inputValue}
                        onChange={handleInputChange}
                      />

                      {inputValue.trim() !== '' && filteredItems.length > 0 && (
                        <ul className="mt-2 absolute bg-white rounded-xl w-full px-2 py-1">
                          {filteredItems.map((item: any, index) => (
                            <li key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }} className='pb-1'>
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div> : <div></div>
                }
              <h3 className="text-base text-grey2 mt-1">Total : {totalData}</h3>
            </div>
          </section>
          <section className="mt-4 mb-10">
            <div className="container-fluid lg:flex flex-none justify-between items-center">
              <div>
                <CSVLink
                  data={itemCSVs}
                  className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block lg:mr-4 mr-0"
                  filename={"Waters-data.csv"}
                  onClick={notifyDownload}
                >
                  File CSV (Data Asli)
                </CSVLink>
                <CSVLink
                  data={itemEncCSVs}
                  className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block lg:mt-0 mt-3"
                  filename={"Waters-Enc-data.csv"}
                  onClick={notifyDownloadEnc}
                >
                  File CSV (Data Enkripsi)
                </CSVLink>
              </div>
              <label className="inline-flex relative items-center cursor-pointer mb-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={toggle}
                  readOnly
                />
                <div
                  onClick={() => {
                    submitToggle();
                  }}
                  className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                ></div>
              </label>
            </div>
          </section>
          <div className="m-2 ">
            {isLoading ? (
              <div className="justify-center mx-auto flex">
                <ReactLoading
                  type="spinningBubbles"
                  color="#174AFF"
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
                      <th scope="col">Ketinggian Air</th>
                      <th scope="col">Oksigen</th>
                      <th scope="col">Kekeruhan Air</th>
                      <th scope="col">Time</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemstable.map((item: WaterDataTypes) => {
                      return (
                        <tr key={item.id} className="align-items-center">
                          <td>{item.no} </td>
                          <td>{item.ketinggianAir}</td>
                          <td>{item.oksigen}</td>
                          <td>{item.kekeruhanAir}</td>
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


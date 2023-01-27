import { useCallback, useEffect, useState } from "react";
import { CardMonitor, Header, Sidebar, SummaryCard } from "../../components";
import { IcHarvest, IcLampAct, IcLampInact, IcParameter, IcUser, IcVegetable } from "../../public/Icon";
// import { GetLamp, GetDataTemperature, SetLamp } from "../../services/dashboard";
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from 'jwt-decode';
import { PieChart, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chart from "../../components/atoms/Chart";
import { GetLamp, SetLamp } from "../../services/dashboard";


export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const [lamp1, setDataLamp1] = useState(false);
  const [lamp2, setDataLamp2] = useState(false);

  const [temperature, setTemperature] = useState([]);
  const [dataSuhu, setdataSuhu] = useState([]);


  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const dataku = [
    {
      name: "senin",
      priceUsd: 300,
    },
    {
      name: "selasa",
      priceUsd: 100,
    },
    {
      name: "rabu",
      priceUsd: 300,
    },
    {
      name: "kamis",
      priceUsd: 50,
    },
    {
      name: "jumat",
      priceUsd: 500,
    },
    {
      name: "sabtu",
      priceUsd: 50,
    }
  ]

  var lampuStatus = lamp1;
  var lampuStatus2 = lamp2;

  const WAIT_TIME = 5000;

  const submitLamp1 = async () => {
    const data = {
      lamp1: lampuStatus,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue = {
      lamp1: data.lamp1 === true ? "OFF" : "ON",
    };

    const response = await SetLamp(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      console.log("ya allah", response.data.lamp1);
      if (response.data.lamp1 == "ON") {
        setDataLamp1(true);
      } else {
        setDataLamp1(false);
      }
      lampuStatus = !lampuStatus;
    }
  };
  const getStatusLamp1 = useCallback(async () => {
    const data = await GetLamp();

    if (data.data.lamp1 == "ON") {
      setDataLamp1(true);
    } else {
      setDataLamp1(false);
    }
  }, [GetLamp]);

  const submitLamp2 = async () => {
    const data = {
      lamp2: lampuStatus2,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue = {
      lamp2: data.lamp2 === true ? "OFF" : "ON",
    };

    const response = await SetLamp(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      console.log("ya allah", response.data.lamp1);
      if (response.data.lamp2 == "ON") {
        setDataLamp2(true);
      } else {
        setDataLamp2(false);
      }
      lampuStatus2 = !lampuStatus2;
    }
  };
  const getStatusLamp2 = useCallback(async () => {
    const data = await GetLamp();

    if (data.data.lamp2 == "ON") {
      setDataLamp2(true);
    } else {
      setDataLamp2(false);
    }
  }, [GetLamp]);

  useEffect(() => {
    getStatusLamp1();
    getStatusLamp2();


    const fetchDatas = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=10");
      const data = await res.json();
      // console.log(data);
      // setdata(data?.data);
      console.log(dataku);
      setdataSuhu(dataku);
    };
    fetchDatas();
  }, []);


  return (
    <>
      {/* Navbar */}
      <div className="dashboard flex">
        <Sidebar
          toggleViewMode={toggleViewMode}
          toggleNavbar={toggleNavbar}
          activeMenu="Dashboard"
        />
        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} isFilter={false} filterBySearch />
          <section className="p-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Dashboard</h3>
              <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              <div className="lg:pt-10 pt-8">
                <div className="flex flex-wrap justify-start items-center -mx-3">
                  <SummaryCard title="Pengguna" total="50" icon={<IcUser />} />
                  <SummaryCard title="Jenis Tanaman" total="50" icon={<IcVegetable />} />
                  <SummaryCard title="Panen Sayuran" total="50" icon={<IcHarvest />} />
                </div>
              </div>

              <div className="flex flex-wrap justify-start items-start -mx-2 lg:pt-10 pt-8">
                <div className="w-full md:w-1/2 px-2 lg:mb-0 mb-4">
                  <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Pemantauan Data</h1>
                  <div className="flex flex-wrap justify-start items-center -mx-2">
                    <CardMonitor value={temperature} isLoading={isLoading} title="Suhu" margin="mr-12" />
                    <CardMonitor value={temperature} isLoading={isLoading} title="Kelembapan Udara" />
                    <CardMonitor value={temperature} isLoading={isLoading} title="Sensor TDS" />
                    <CardMonitor value={temperature} isLoading={isLoading} title="Sensor Oksigen" />
                    <CardMonitor value={temperature} isLoading={isLoading} title="Kelembapan Tanah" />
                    <CardMonitor value={temperature} isLoading={isLoading} title="PH Tanah" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-2 lg:mb-0 mb-4">
                  <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Fitur Kontrol</h1>
                  <div className="flex flex-wrap justify-start items-center -mx-2">
                    <button
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                      onClick={submitLamp1}

                      type="button"
                    >
                      {/* <div className="col-md-12 card-control"> */}
                      <div
                        className={
                          lamp1
                            ? "w-full card-control p-3 justify-center  lg:mr-4 mr-2"
                            : "w-full card-control-off p-3 justify-center  lg:mr-4 mr-10"
                        }
                      >
                        <div className="card-body text-center inline-block">
                          {lamp1 ? <IcLampInact /> : <IcLampAct />}

                          <h1 className="lg:text-xl text-lg">Lamp 1</h1>
                        </div>
                      </div>
                    </button>
                    <button
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                      onClick={submitLamp2}

                      type="button"
                    >
                      {/* <div className="col-md-12 card-control"> */}
                      <div
                        className={
                          lamp2
                            ? "w-full card-control p-3 justify-center lg:mr-4 mr-2"
                            : "w-full card-control-off p-3 justify-center lg:mr-4 mr-10"
                        }
                      >
                        <div className="card-body text-center inline-block">
                          {lamp2 ? <IcLampInact /> : <IcLampAct />}

                          <h1 className="lg:text-xl text-lg">Lamp 1</h1>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="p-3 lg:mt-7 mt-8">
            <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Pemantauan Data</h1>
            <div className="flex flex-wrap justify-start items-center -mx-2">
              <div className="w-full md:w-1/2 px-3 lg:mb-0 mb-4">
                <Chart data={dataSuhu} title="Suhu" />
              </div>
              <div className="w-full md:w-1/2 px-3 lg:mb-0 mb-4">
                <Chart data={dataSuhu} title="Kelembapan Udara" />
              </div>
            </div>


          </section>

        </div>
      </div>
    </>
  );
}

// interface GetServerSideProps{
//   req: {
//     cookies:{
//       token:string,
//     }
//   }
// }

// export async function getServerSideProps({ req }:GetServerSideProps) {
//   const { token } = req.cookies;
//   if (!token) {
//     return {
//       redirect: {
//         destination: '/sign-in',
//         permanent: false,
//       },
//     };
//   }

//   const jwtToken = Buffer.from(token, 'base64').toString('ascii');
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



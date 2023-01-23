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


export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const [lamp1, setDataLamp1] = useState(false);
  const [dataLamp2, setDataLamp2] = useState(false);

  const [temperature, setTemperature] = useState([]);
  const [data, setdata] = useState();



  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const dataku = [
    {
      name:"senin",
      priceUsd:300,
    },
    {
      name:"selasa",
      priceUsd:100,
    },
    {
      name:"rabu",
      priceUsd:300,
    },
    {
      name:"kamis",
      priceUsd:50,
    },
    {
      name:"jumat",
      priceUsd:500,
    },
    {
      name:"sabtu",
      priceUsd:50,
    }
  ]

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=10");
      const data = await res.json();
      // console.log(data);
      // setdata(data?.data);
      console.log(dataku);
      setdata(dataku);
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

                      type="button"
                    >
                      {/* <div className="col-md-12 card-control"> */}
                      <div
                        className={
                          lamp1
                            ? "w-full card-control p-3 justify-center lg:mr-4 mr-2"
                            : "w-full card-control-off p-3 justify-center lg:mr-4 mr-10"
                        }
                      >
                        <div className="card-body text-center inline-block">
                          {lamp1 ? <IcLampInact /> : <IcLampAct />}

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
                <Chart data={data} title="Suhu" />
              </div>
              <div className="w-full md:w-1/2 px-3 lg:mb-0 mb-4">
                <Chart data={data} title="Kelembapan Udara"/>
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



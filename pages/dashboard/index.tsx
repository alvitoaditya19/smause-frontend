import { useCallback, useEffect, useState } from "react";
import { CardMonitor, Header, Sidebar, SummaryCard } from "../../components";
import { IcHarvest, IcLampAct, IcLampInact, IcUser, IcVegetable } from "../../public/Icon";
import jwtDecode from 'jwt-decode';
import { createDecipheriv } from 'crypto';



import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chart from "../../components/atoms/Chart";
import { getAllDataSetting, getAllDataUser, GetControl, GetAirsEnc, SetControl } from "../../services/dashboard";
import { ControlTypes, JWTPayloadTypes, TemperatureDataTypes, UserStateTypes } from "../../services/data-types";


interface UserDataStateTypes {
  user: UserStateTypes;
}

export default function Dashboard(props: UserDataStateTypes) {
  const { user } = props;

  const [totalVegetable, setTotalVegetable] = useState(0);
  const [totalHarvest, settotalHarvest] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [toggleViewMode, setToggleViewMode] = useState(false);
  const [celcius, setCelcius] = useState("");
  const [humidity, setHumidity] = useState("");

  const [dataGrapAirs, seDataGrapAirs] = useState([]);

  const [totalDataUser, setTotalDataUser] = useState(0);

  const WAIT_TIME = 5000;
  const cryptoAlgorithm = 'aes-128-cbc';
  const key = 'tugasakhir421654'; //16 karakter
  const iv = '4567123212343219'; //16 karakter

  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const totalVege = async () => {
    setIsLoading(true);

    const getDataTotal = await getAllDataSetting();
    setIsLoading(false);
    setTotalVegetable(getDataTotal.data.totalVegetable)
  }
  const totalHarvs = async () => {
    setIsLoading(true);

    const getDataTotal = await getAllDataSetting();
    setIsLoading(false);
    settotalHarvest(getDataTotal.data.totalHarvest)
  }
  const totalUser = async () => {
    setIsLoading(true);

    const getDataTotal = await getAllDataUser();

    if (getDataTotal.data === null) {
      return setIsLoading(true);
    }
    setIsLoading(false);
    setTotalDataUser(getDataTotal.data.total)
  }
  const getValueAirs = useCallback(async () => {
    setIsLoading(true);
    const data: any = await GetAirsEnc();
    setIsLoading(false);

    const dataMapCel = data.data.data.slice(-1)[0].celcius
    const dataMapHum = data.data.data.slice(-1)[0].humidity

    const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decCelcius = dataDecipher1.update(dataMapCel, 'hex', 'utf8')
    decCelcius += dataDecipher1.final('utf8');

    const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decHumidity = dataDecipher2.update(dataMapHum, 'hex', 'utf8')
    decHumidity += dataDecipher2.final('utf8');

    setCelcius(decCelcius);
    setHumidity(decHumidity);
  }, [GetAirsEnc]);

  const getValueGraphAirs = useCallback(async () => {
    setIsLoading(true);

    const data: any = await GetAirsEnc();
    setIsLoading(false);

    const dataMap = data.data.data

    const dataMapDec = dataMap.slice(0, 4).map((suhuDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decCelcius = dataDecipher1.update(suhuDataMap.celcius, 'hex', 'utf8')
      decCelcius += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decHumidity = dataDecipher2.update(suhuDataMap.humidity, 'hex', 'utf8')
      decHumidity += dataDecipher2.final('utf8');

      return {
        no: index + 1,
        id: suhuDataMap.id,
        celcius: decCelcius,
        humidity: decHumidity,
        date: suhuDataMap.date,
        time: suhuDataMap.time
      };
    })
    seDataGrapAirs(dataMapDec);
  }, [GetAirsEnc]);

  useEffect(() => {

    totalVege()
    totalHarvs()
    totalUser()

    const id = setInterval(() => {
      getValueGraphAirs();
      getValueAirs();
    }, WAIT_TIME);

    return () => clearInterval(id);
  }, []);



  return (
    <>
      {/* Navbar */}
      <div className="dashboard flex">
        {
          user.status == "admin" ? <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Dashboard"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Dashboard"
          />
        }

        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} isFilter={false} name={user.name} />
          <section className="p-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Dashboard</h3>
              <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              <div className="lg:pt-10 pt-8">
                <div className="flex flex-wrap justify-start items-center -mx-3">
                  <SummaryCard isLoading={isLoading} title="Pengguna" total={totalDataUser} icon={<IcUser />} />
                  <SummaryCard isLoading={isLoading} title="Semua Tanaman" total={totalHarvest} icon={<IcVegetable />} />
                  <SummaryCard isLoading={isLoading} title="Panen Sayuran" total={totalVegetable} icon={<IcHarvest />} />
                </div>
              </div>

              <div className="flex flex-wrap justify-start items-start -mx-2 lg:pt-10 pt-8">
                <div className="w-full md:w-3/4 px-2 lg:mb-0 mb-4">
                  <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Pemantauan Data</h1>
                  <div className="flex flex-wrap justify-start items-center -mx-2">
                    <CardMonitor value={celcius} isLoading={isLoading} title="Suhu" margin="mr-12" />
                    <CardMonitor value={humidity} isLoading={isLoading} title="Kelembapan Udara" />
                    <CardMonitor value={celcius} isLoading={isLoading} title="Sensor TDS" />
                    <CardMonitor value={celcius} isLoading={isLoading} title="Sensor Oksigen" />
                    <CardMonitor value={celcius} isLoading={isLoading} title="Kelembapan Tanah" />
                    <CardMonitor value={celcius} isLoading={isLoading} title="PH Tanah" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="p-3 lg:mt-7 mt-8">
            <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Pemantauan Data</h1>
            <div className="flex flex-wrap justify-start items-center -mx-2">
              <div className="w-full md:w-1/2 px-3 lg:mb-0 mb-4">
                <Chart data={dataGrapAirs} title="Suhu" focusX="celcius" focusY="time" />
              </div>
              <div className="w-full md:w-1/2 px-3 lg:mb-0 mb-4">
                <Chart data={dataGrapAirs} title="Kelembapan Udara" focusX="humidity" focusY="time" />
              </div>
            </div>
          </section>
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



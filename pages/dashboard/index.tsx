import { createDecipheriv } from 'crypto';
import jwtDecode from 'jwt-decode';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { use, useCallback, useEffect, useState } from "react";
import { CardMonitor, Header, Sidebar, SummaryCard } from "../../components";
import { IcHarvest, IcUser, IcVegetable } from "../../public/Icon";

import io from 'socket.io-client';
import Chart from "../../components/atoms/Chart";
import { GetAirsEnc, getAllDataSetting, GetSoilsEnc, GetUserData, GetWatersEnc } from "../../services/dashboard";
import { JWTPayloadTypes, UserStateTypes } from "../../services/data-types";


interface UserDataStateTypes {
  user: UserStateTypes;
}


const host: any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host, { transports: ['websocket'] });

export default function Dashboard(props: UserDataStateTypes) {
  const { user } = props;

  const [totalVegetable, setTotalVegetable] = useState(0);


  const [totalHarvest, settotalHarvest] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [toggleViewMode, setToggleViewMode] = useState(false);
  const [celcius, setCelcius] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ketinggianAir, setKetinggianAir] = useState("");
  const [oksigen, setOksigen] = useState("");
  const [kekeruhanAir, setKekeruhanAir] = useState("");
  const [kelembapanTanah, setKelembapanTanah] = useState("");
  const [phTanah, setPhTanah] = useState("");

  const [dataGrapAirs, seDataGrapAirs] = useState([]);
  const [dataGrapWaters, seDataGrapWaters] = useState([]);
  const [dataGrapSoils, seDataGrapSoils] = useState([]);
  const [dataGrapSoilKelems, seDataGrapSoilKelems] = useState([]);


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

    const getDataTotal = await getAllDataSetting(1, Infinity);
    setIsLoading(false);
    setTotalVegetable(getDataTotal.data.totalVegetable)
  }
  const totalHarvs = async () => {
    setIsLoading(true);

    const getDataTotal = await getAllDataSetting(1, Infinity);
    setIsLoading(false);
    settotalHarvest(getDataTotal.data.totalHarvest)
  }
  const totalUser = async () => {
    setIsLoading(true);

    const getDataTotal = await GetUserData(1, Infinity);

    if (getDataTotal.data === null) {
      return setIsLoading(true);
    }
    setIsLoading(false);
    setTotalDataUser(getDataTotal.data.total)
  }

  const getValueAirs = useCallback(async () => {
    setIsLoading(true);
    const data: any = await GetAirsEnc(1, Infinity);
    setIsLoading(false);
   
    if (data.data.data.length === 0) {
      return setCelcius("0"),  setHumidity("0");
    }
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

  const getValueWaters = useCallback(async () => {
    setIsLoading(true);
    const data: any = await GetWatersEnc(1, Infinity);
    setIsLoading(false);
    if (data.data.data.length === 0) {
      return   setKetinggianAir("0"), setOksigen("0"), setKekeruhanAir("0");
    }
    const dataMapKetiA = data.data.data.slice(-1)[0].ketinggianAir ?? "30039b4d60c8126a163c1805ba1882fb"
    const dataMapOks = data.data.data.slice(-1)[0].oksigen ?? "30039b4d60c8126a163c1805ba1882fb"
    const dataMapKeruhA = data.data.data.slice(-1)[0].kekeruhanAir ?? "30039b4d60c8126a163c1805ba1882fb"


    const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decKetinggianAir = dataDecipher1.update(dataMapKetiA, 'hex', 'utf8')
    decKetinggianAir += dataDecipher1.final('utf8');

    const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decOksigen = dataDecipher2.update(dataMapOks, 'hex', 'utf8')
    decOksigen += dataDecipher2.final('utf8');

    const dataDecipher3 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decKeruhAir = dataDecipher3.update(dataMapKeruhA, 'hex', 'utf8')
    decKeruhAir += dataDecipher3.final('utf8');

    setKetinggianAir(decKetinggianAir);
    setOksigen(decOksigen);
    setKekeruhanAir(decKeruhAir);

  }, [GetWatersEnc]);

  const getValueSoils = useCallback(async () => {
    setIsLoading(true);
    const data: any = await GetSoilsEnc(1, Infinity);
    setIsLoading(false);

    if (data.data.data.length === 0) {
      return setKelembapanTanah("0"),setPhTanah("0");
    }

    const dataMapKelemTa = data.data.dataSoilKelem.slice(-1)[0].kelembapanTanah
    const dataMapPHTa = data.data.dataSoil.slice(-1)[0].phTanah

    const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decKelembapanTanah = dataDecipher1.update(dataMapKelemTa, 'hex', 'utf8')
    decKelembapanTanah += dataDecipher1.final('utf8');

    const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decPHTanah = dataDecipher2.update(dataMapPHTa, 'hex', 'utf8')
    decPHTanah += dataDecipher2.final('utf8');


    setKelembapanTanah(decKelembapanTanah);
    setPhTanah(decPHTanah);

  }, [GetSoilsEnc]);

  const getValueGraphAirs = useCallback(async () => {
    setIsLoading(true);

    const data: any = await GetAirsEnc(1, Infinity);
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

    console.log("kenapa ih", dataMapDec)
    seDataGrapAirs(dataMapDec);
  }, [GetAirsEnc]);

  const getValueGraphWaters = useCallback(async () => {
    setIsLoading(true);

    const data: any = await GetWatersEnc(1, Infinity);
    setIsLoading(false);

    const dataMap = data.data.data

    const dataMapDec = dataMap.slice(-4).map((watersDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKetinggianAir = dataDecipher1.update(watersDataMap.ketinggianAir, 'hex', 'utf8')
      decKetinggianAir += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decOksigen = dataDecipher2.update(watersDataMap.oksigen, 'hex', 'utf8')
      decOksigen += dataDecipher2.final('utf8');

      const dataDecipher3 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKeruhAir = dataDecipher3.update(watersDataMap.kekeruhanAir, 'hex', 'utf8')
      decKeruhAir += dataDecipher3.final('utf8');

      return {
        no: index + 1,
        id: watersDataMap.id,
        ketinggianAir: decKetinggianAir,
        oksigen: decOksigen,
        kekeruhanAir: decKeruhAir,
        date: watersDataMap.date,
        time: watersDataMap.time
      };
    })
    seDataGrapWaters(dataMapDec);
  }, [GetWatersEnc]);

  const getValueGraphSoils = useCallback(async () => {
    setIsLoading(true);

    const data: any = await GetSoilsEnc(1, Infinity);
    setIsLoading(false);

    const dataMap = data.data.data

    const dataMapDec = data.data.dataSoil.slice(0, 4).map((watersDataMap: any, index: any) => {
      // const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      // let decKelembapanTanah = dataDecipher1.update(watersDataMap.kelembapanTanah, 'hex', 'utf8')
      // decKelembapanTanah += dataDecipher1.final('utf8');

      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decPHTanah = dataDecipher2.update(watersDataMap.phTanah, 'hex', 'utf8')
      decPHTanah += dataDecipher2.final('utf8');

      return {
        no: index + 1,
        id: watersDataMap.id,
        // kelembapanTanah: decKelembapanTanah,
        phTanah: decPHTanah,
        date: watersDataMap.date,
        time: watersDataMap.time
      };
    })

    const dataMapKelemDec = data.data.dataSoilKelem.slice(0, 4).map((watersDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKelembapanTanah = dataDecipher1.update(watersDataMap.kelembapanTanah, 'hex', 'utf8')
      decKelembapanTanah += dataDecipher1.final('utf8');

      // const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      // let decPHTanah = dataDecipher2.update(watersDataMap.phTanah, 'hex', 'utf8')
      // decPHTanah += dataDecipher2.final('utf8');

      return {
        no: index + 1,
        id: watersDataMap.id,
        kelembapanTanah: decKelembapanTanah,
        // phTanah: decPHTanah,
        date: watersDataMap.date,
        time: watersDataMap.time
      };
    })

    console.log("sasa", dataMapDec)
    console.log("safsokfpsa", dataMapKelemDec)

    seDataGrapSoils(dataMapDec);
    seDataGrapSoilKelems(dataMapKelemDec)
  }, [GetSoilsEnc]);

  useEffect(() => {
    socket.on('dataCardAir', (data) => {
      setOksigen(data[0].oksigen);
      setKekeruhanAir(data[0].kekeruhanAir)
      setKetinggianAir(data[0].ketinggianAir)
    });

    socket.on('dataCardUdara', (data) => {
      setHumidity(data[0].humidity);
      setCelcius(data[0].celcius)
    });

    socket.on('dataCardTanah', (data) => {
      // console.log("dadatada", data)
      // setKelembapanTanah(data[0].kelembapanTanah);
      setPhTanah(data[0].phTanah)
    });

    socket.on('dataCardTanahKelem', (data) => {
      // console.log("dadatada", data)
      setKelembapanTanah(data[0].kelembapanTanah);
      // setPhTanah(data[0].phTanah)
    });
    socket.on('dataGraphAir', (data) => {
      seDataGrapWaters(data);

    });
    socket.on('dataGraphUdara', (data) => {
      seDataGrapAirs(data);

    });
    socket.on('dataGraphTanah', (data) => {
      seDataGrapSoils(data);
    });

    socket.on('dataGraphTanahKelem', (data) => {
      seDataGrapSoilKelems(data);
    });

    socket.on('dataMessaage', (data) => {
      toast.error(`Nilai : ${data.nilai} | ${data.message}!!!!!!!`, {
        theme: "colored",
      });

    });

    totalVege()
    totalHarvs()
    totalUser()

    getValueAirs();
    getValueWaters();
    getValueSoils();

    // const id = setInterval(() => {
    //   getValueAirs();
    //   getValueWaters();
    //   getValueSoils();

    // }, WAIT_TIME);

    getValueGraphAirs();
    getValueGraphWaters();
    getValueGraphSoils();

    // return () => clearInterval(id);,, {transports: ['websocket']}
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
          <Header toggleNavbar={toggleNavbar} isFilter={false} name={user.name} imageProfile={user.avatar} />
          <section className="px-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Dashboard</h3>
              <p className=" text-base text-grey2 mt-2">Kelola data tanaman sebaik mungkin</p>

              <div className="lg:pt-10 pt-8">
                <div className="flex flex-wrap justify-start items-center -mx-3">
                  <SummaryCard isLoading={isLoading} title="Pengguna" total={totalDataUser} icon={<IcUser />} />
                  <SummaryCard isLoading={isLoading} title="Semua Tanaman" total={totalHarvest} icon={<IcVegetable />} />
                  <SummaryCard isLoading={isLoading} title="Panen Sayuran" total={totalVegetable} icon={<IcHarvest />} />
                </div>
              </div>

              <div className="flex flex-wrap justify-start items-start -mx-2 lg:pt-10 pt-8">
                <div className="w-full px-2 lg:mb-0 mb-4">
                  <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Pemantauan Data</h1>
                  <div className="flex flex-wrap justify-start items-center -mx-4">
                    <CardMonitor value={celcius} isLoading={isLoading} title="Suhu" margin="mr-12" satuan="Celcius" />
                    <CardMonitor value={humidity} isLoading={isLoading} title="Kelembapan Udara"satuan="RH" />
                    <CardMonitor value={kekeruhanAir} isLoading={isLoading} title="Sensor TDS" satuan="mg/l"/>
                    <CardMonitor value={oksigen} isLoading={isLoading} title="Sensor Oksigen" satuan="LPM"/>
                    <CardMonitor value={ketinggianAir} isLoading={isLoading} title="Ketinggian Air"  satuan="cm"/>
                    <CardMonitor value={kelembapanTanah} isLoading={isLoading} title="Kelembapan Tanah"  satuan="RH"/>
                    <CardMonitor value={phTanah} isLoading={isLoading} title="PH Tanah" satuan="PH"/>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="p-3 lg:mt-7 mt-8">
            <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Pemantauan Data</h1>
            <div className="flex flex-wrap justify-start items-center -mx-2">
              <div className="w-1/2 px-3 lg:mb-0 mb-4">
                <Chart data={dataGrapAirs} title="Suhu" focusX="celcius" focusY="time" />
              </div>
              <div className="w-1/2 px-3 lg:mb-0 mb-4">
                <Chart data={dataGrapAirs} title="Kelembapan Udara" focusX="humidity" focusY="time" />
              </div>
              <div className="w-1/2 px-3 lg:mb-0 mb-4 lg:mt-8 mt-4">
                <Chart data={dataGrapWaters} title="TDS" focusX="kekeruhanAir" focusY="time" />
              </div>
              <div className="w-1/2 px-3 lg:mb-0 mb-4 lg:mt-8 mt-4">
                <Chart data={dataGrapWaters} title="Oksigen" focusX="oksigen" focusY="time" />
              </div>
              <div className="w-1/2 px-3 lg:mb-0 mb-4 lg:mt-8 mt-4">
                <Chart data={dataGrapWaters} title="Ketinggian Air" focusX="ketinggianAir" focusY="time" />
              </div>
              <div className="w-1/2 px-3 lg:mb-0 mb-4 lg:mt-8 mt-4">
                <Chart data={dataGrapSoils} title="Kelembapan Tanah" focusX="phTanah" focusY="time" />
              </div>
              <div className="w-1/2 px-3 lg:mb-0 mb-4 lg:mt-8 mt-4">
                <Chart data={dataGrapSoilKelems} title="PH Tanah" focusX="kelembapanTanah" focusY="time" />
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
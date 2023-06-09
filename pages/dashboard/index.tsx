import { createDecipheriv } from 'crypto';
import jwtDecode from 'jwt-decode';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SetStateAction, use, useCallback, useEffect, useState } from "react";
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
  const [decDataCelcius, setDecCelcius] = useState("");
  const [decDataHumidity, setDecHumidity] = useState("");

  const [ketinggianAir, setKetinggianAir] = useState("");
  const [oksigen, setOksigen] = useState("");
  const [kekeruhanAir, setKekeruhanAir] = useState("");
  const [kelembapanTanah, setKelembapanTanah] = useState("");
  const [phTanah, setPhTanah] = useState("");

  const [dataGrapAirs, setDataGrapAirs] = useState([]);
  const [dataGrapWaters, seDataGrapWaters] = useState([]);
  const [dataGrapSoils, seDataGrapSoils] = useState([]);
  const [dataGrapSoilKelems, seDataGrapSoilKelems] = useState([]);

  const [totalDataUser, setTotalDataUser] = useState(0);

  const [inputValue, setInputValue] = useState('');

  const [filteredItems, setFilteredItems] = useState([]);
  // const [allDataUser, setAllDataUser] = useState([]);



  const WAIT_TIME = 5000;
  const cryptoAlgorithm = 'aes-128-cbc';
  const key = 'tugasakhir421654'; //16 karakter
  const iv = '4567123212343219'; //16 karakter

  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const totalVege = async () => {
    setIsLoading(true);

    const getDataTotal = await getAllDataSetting(user.id, 1, Infinity);
    setIsLoading(false);
    setTotalVegetable(getDataTotal.data.totalVegetable)
  }
  const totalHarvs = async () => {
    setIsLoading(true);

    const getDataTotal = await getAllDataSetting(user.id, 1, Infinity);
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
    const data: any = await GetAirsEnc(user.id, 1, Infinity);
    setIsLoading(false);

    if (data.data.data.length === 0) {
      return setCelcius("0"), setHumidity("0"), setDecCelcius("0"), setDecHumidity("0");
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
    const data: any = await GetWatersEnc(user.id, 1, Infinity);
    setIsLoading(false);
    if (data.data.data.length === 0) {
      return setKetinggianAir("0"), setOksigen("0"), setKekeruhanAir("0");
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
    const data: any = await GetSoilsEnc(user.id, 1, Infinity);
    setIsLoading(false);

    if (data.data.data.length === 0) {
      return setKelembapanTanah("0"), setPhTanah("0");
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

    const data: any = await GetAirsEnc(user.id, 1, Infinity);
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
    setDataGrapAirs(dataMapDec);
  }, [GetAirsEnc]);

  const getValueGraphWaters = useCallback(async () => {
    setIsLoading(true);

    const data: any = await GetWatersEnc(user.id, 1, Infinity);
    setIsLoading(false);

    const dataMap = data.data.data

    const dataMapDec = dataMap.slice(0, 4).map((watersDataMap: any, index: any) => {
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

    const data: any = await GetSoilsEnc(user.id, 1, Infinity);
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


    seDataGrapSoils(dataMapDec);
    seDataGrapSoilKelems(dataMapKelemDec)
  }, [GetSoilsEnc]);

  const getDataUser = async () => {
    setIsLoading(true);

    const data: any = await GetUserData(1, Infinity);
    const dataUsers = data.data.data.map((user: any) => {
      return {
        id: user._id,
        name: user.name
      };
    });
    setIsLoading(false);
    setFilteredItems(dataUsers)

    filterItems(dataUsers);
  };


  // const items = ["Item 1", "Item 2", "Item 3", "Another Item"];

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
    filterItems(value);
  };

  const handleItemClick = async (item: any) => {
    setIsLoading(true);
    const dataAir: any = await GetAirsEnc(item.id, 1, Infinity);
    const dataWater: any = await GetWatersEnc(item.id, 1, Infinity);
    const dataSoil: any = await GetSoilsEnc(item.id, 1, Infinity);

    setIsLoading(false);
    const dataMapGraphAir = dataAir.data.data
    const dataMapGraphWater = dataWater.data.data
    const dataMapGraphSoil = dataSoil.data.dataSoil
    const dataMapGraphSoilKelems = dataSoil.data.dataSoilKelem

    if (dataAir.data.data.length === 0) {
       setCelcius("0"), setHumidity("0"),setDataGrapAirs([]);
    }
    if (dataWater.data.data.length === 0) {
       setKetinggianAir("0"), setOksigen("0"), setKekeruhanAir("0"),seDataGrapWaters([]);
    }
    if (dataSoil.data.dataSoil.length === 0) {
      setKelembapanTanah("0");
   }
    if (dataSoil.data.dataSoilKelem.length === 0) {
      setPhTanah("0");
  }
  
    const dataMapCel = dataAir.data.data.slice(-1)[0]?.celcius ?? "30039b4d60c8126a163c1805ba1882fb";
    const dataMapHum = dataAir.data.data.slice(-1)[0]?.humidity ?? "30039b4d60c8126a163c1805ba1882fb"

    const dataMapKetiA = dataWater.data.data.slice(-1)[0]?.ketinggianAir ?? "30039b4d60c8126a163c1805ba1882fb"
    const dataMapOks = dataWater.data.data.slice(-1)[0]?.oksigen ?? "30039b4d60c8126a163c1805ba1882fb"
    const dataMapKeruhA = dataWater.data.data.slice(-1)[0]?.kekeruhanAir ?? "30039b4d60c8126a163c1805ba1882fb"

    const dataMapPhTanah = dataMapGraphSoil.slice(-1)[0]?.phTanah ?? "30039b4d60c8126a163c1805ba1882fb"
    const dataMapKelem = dataMapGraphSoilKelems.slice(-1)[0]?.kelembapanTanah ?? "30039b4d60c8126a163c1805ba1882fb"
   
    // DATA UDARA
    const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decCelcius = dataDecipher1.update(dataMapCel, 'hex', 'utf8')
    decCelcius += dataDecipher1.final('utf8');

    const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decHumidity = dataDecipher2.update(dataMapHum, 'hex', 'utf8')
    decHumidity += dataDecipher2.final('utf8');

    const dataMapDecAir = dataMapGraphAir.slice(0, 4).map((suhuDataMap: any, index: any) => {
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

    // TANAH
    const dataDecipherSoil1 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decPHTanah = dataDecipherSoil1.update(dataMapPhTanah, 'hex', 'utf8')
    decPHTanah += dataDecipherSoil1.final('utf8');

    const dataDecipherSoil2 = createDecipheriv(cryptoAlgorithm, key, iv);
    let decKelembapanTanah = dataDecipherSoil2.update(dataMapKelem, 'hex', 'utf8')
    decKelembapanTanah += dataDecipherSoil2.final('utf8');

    const dataMapSoilDec = dataSoil.data.dataSoil.slice(0, 4).map((watersDataMap: any, index: any) => {
      const dataDecipher2 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decPHTanah = dataDecipher2.update(watersDataMap.phTanah, 'hex', 'utf8')
      decPHTanah += dataDecipher2.final('utf8');

      return {
        no: index + 1,
        id: watersDataMap.id,
        phTanah: decPHTanah,
        date: watersDataMap.date,
        time: watersDataMap.time
      };
    })

    const dataMapKelemDec = dataSoil.data.dataSoilKelem.slice(0, 4).map((watersDataMap: any, index: any) => {
      const dataDecipher1 = createDecipheriv(cryptoAlgorithm, key, iv);
      let decKelembapanTanah = dataDecipher1.update(watersDataMap.kelembapanTanah, 'hex', 'utf8')
      decKelembapanTanah += dataDecipher1.final('utf8');

      return {
        no: index + 1,
        id: watersDataMap.id,
        kelembapanTanah: decKelembapanTanah,
        date: watersDataMap.date,
        time: watersDataMap.time
      };
    })

    setInputValue(item.name);
    setFilteredItems([]);
    const getDataTotalVege = await getAllDataSetting(item.id, 1, Infinity);
    setTotalVegetable(getDataTotalVege.data.totalVegetable)
    settotalHarvest(getDataTotalVege.data.totalHarvest)

    setCelcius(decCelcius);
    setHumidity(decHumidity);
    setDataGrapAirs(dataMapDecAir);

    setKetinggianAir(decKetinggianAir);
    setOksigen(decOksigen);
    setKekeruhanAir(decKeruhAir);
    seDataGrapWaters(dataMapDecWater);

    setKelembapanTanah(decKelembapanTanah);
    setPhTanah(decPHTanah);
    seDataGrapSoils(dataMapSoilDec);
    seDataGrapSoilKelems(dataMapKelemDec)

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

  useEffect(() => {

    getDataUser();

    socket.on('dataCardAir', (data) => {
      if (data.userId === user.id) {
        setOksigen(data.data[0].oksigen);
        setKekeruhanAir(data.data[0].kekeruhanAir)
        setKetinggianAir(data.data[0].ketinggianAir)
      }
    });

    socket.on('dataCardUdara', (data) => {
      if (data.userId === user.id) {
        setHumidity(data.data[0].humidity);
        setCelcius(data.data[0].celcius)
      }
    });

    socket.on('dataCardTanah', (data) => {
      // setKelembapanTanah(data[0].kelembapanTanah);
      if (data.userId === user.id) {
        setPhTanah(data.data[0].phTanah)
      }
    });

    socket.on('dataCardTanahKelem', (data) => {
      if (data.userId === user.id) {
        setKelembapanTanah(data.data[0].kelembapanTanah);
        // setPhTanah(data[0].phTanah)
      }
    });
    socket.on('dataGraphAir', (data) => {
      if (data.userId === user.id) {
        seDataGrapWaters(data.data);
      }
    });
    socket.on('dataGraphUdara', (data) => {
      if (data.userId === user.id) {
        setDataGrapAirs(data.data);
      }
    });
    socket.on('dataGraphTanah', (data) => {
      if (data.userId === user.id) {
        seDataGrapSoils(data.data);
      }
    });

    socket.on('dataGraphTanahKelem', (data) => {
      if (data.userId === user.id) {
        seDataGrapSoilKelems(data.data);
      }
    });

    socket.on('dataMessaage', (data) => {
      if (data.userId === user.id) {
        toast.error(`Nilai : ${data.data.nilai} | ${data.data.message}!!!!!!!`, {
          theme: "colored",
        });
      }
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
              <div className="flex flex-wrap justify-between items-center">
                <div className="">
                  <h3 className="text-3xl text-black font-bold">Dashboard</h3>
                  <p className=" text-base text-grey2 mt-2">Kelola data tanaman sebaik mungkin</p>
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
              </div>
              <div className="lg:pt-10 pt-8">
                <div className="flex flex-wrap justify-start items-center -mx-3">
                  {
                    user.status === "admin" ? <SummaryCard isLoading={isLoading} title="Pengguna" total={totalDataUser} icon={<IcUser />} /> : <div></div>
                  }

                  <SummaryCard isLoading={isLoading} title="Semua Tanaman" total={totalHarvest} icon={<IcVegetable />} />
                  <SummaryCard isLoading={isLoading} title="Panen Sayuran" total={totalVegetable} icon={<IcHarvest />} />
                </div>
              </div>

              <div className="flex flex-wrap justify-start items-start -mx-2 lg:pt-10 pt-8">
                <div className="w-full px-2 lg:mb-0 mb-4">
                  <h1 className="text-2xl font-semibold text-black lg:mb-2 mb-0">Pemantauan Data</h1>
                  <div className="flex flex-wrap justify-start items-center -mx-4">
                    <CardMonitor value={celcius} isLoading={isLoading} title="Suhu" margin="mr-12" satuan="Celcius" />
                    <CardMonitor value={humidity} isLoading={isLoading} title="Kelembapan Udara" satuan="RH" />
                    <CardMonitor value={kekeruhanAir} isLoading={isLoading} title="Sensor TDS" satuan="mg/l" />
                    <CardMonitor value={oksigen} isLoading={isLoading} title="Sensor Oksigen" satuan="LPM" />
                    <CardMonitor value={ketinggianAir} isLoading={isLoading} title="Ketinggian Air" satuan="cm" />
                    <CardMonitor value={kelembapanTanah} isLoading={isLoading} title="Kelembapan Tanah" satuan="RH" />
                    <CardMonitor value={phTanah} isLoading={isLoading} title="PH Tanah" satuan="PH" />
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
                <Chart data={dataGrapSoils} title="phTanah" focusX="phTanah" focusY="time" />
              </div>
              <div className="w-1/2 px-3 lg:mb-0 mb-4 lg:mt-8 mt-4">
                <Chart data={dataGrapSoilKelems} title="Kelembapan Tanah" focusX="kelembapanTanah" focusY="time" />
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
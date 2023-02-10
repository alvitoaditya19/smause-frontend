import { useCallback, useEffect, useState } from "react";

import jwtDecode from 'jwt-decode';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ControlTypes, JWTPayloadTypes, UserStateTypes } from "../../../services/data-types";
import { getAllDataUser, GetControl, SetControl } from "../../../services/dashboard";
import { CardMonitor, Header, Sidebar, SummaryCard } from "../../../components";
import { IcHarvest, IcLampAct, IcLampInact, IcUser, IcVegetable } from "../../../public/Icon";
import Image from "next/image";

interface UserDataStateTypes{
  user: UserStateTypes;
}

export default function Kontrol(props: UserDataStateTypes) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const [lamp1, setDataLamp1] = useState(false);
  const [lamp2, setDataLamp2] = useState(false);
  const [pump1, setDataPump1] = useState(false);
  const [pump2, setDataPump2] = useState(false);
  const [valve, setDataValve] = useState(false);
  const [blend, setDataBlend] = useState(false);

  const [temperature, setTemperature] = useState([]);
  const [dataSuhu, setdataSuhu] = useState([]);

  const [totalDataUser, setTotalDataUser] = useState(0);

  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  var lampuStatus  = lamp1;
  var lampuStatus2 = lamp2;
  var pompaStatus = pump1;
  var pompaStatus2 = pump2;
  var statusValve = valve;
  var statusBlend = blend;

  const submitLamp1 = async () => {
    const data = {
      lamp1: lampuStatus,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue : Partial<ControlTypes> = {
      lamp1: data.lamp1 === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

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
    const data = await GetControl();

    if (data.data.lamp1 == "ON") {
      setDataLamp1(true);
    } else {
      setDataLamp1(false);
    }
  }, [GetControl]);

  const submitLamp2 = async () => {
    const data = {
      lamp2: lampuStatus2,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue = {
      lamp2: data.lamp2 === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

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
    const data = await GetControl();

    if (data.data.lamp2 == "ON") {
      setDataLamp2(true);
    } else {
      setDataLamp2(false);
    }
  }, [GetControl]);

  const submitPump1 = async () => {
    const data = {
      pump1: pompaStatus,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue = {
      pump1: data.pump1 === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      if (response.data.pump1 == "ON") {
        setDataPump1(true);
      } else {
        setDataPump1(false);
      }
      pompaStatus = !pompaStatus;
    }
  };
  const getStatusPump1 = useCallback(async () => {
    const data = await GetControl();

    if (data.data.pump2 == "ON") {
      setDataLamp1(true);
    } else {
      setDataLamp1(false);
    }
  }, [GetControl]);

  const submitPump2 = async () => {
    const data = {
      pump2: pompaStatus2,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue = {
      pump2: data.pump2 === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      if (response.data.pump2 == "ON") {
        setDataPump2(true);
      } else {
        setDataPump2(false);
      }
      pompaStatus2 = !pompaStatus2;
    }
  };
  const getStatusPump2 = useCallback(async () => {
    const data = await GetControl();

    if (data.data.pump2 == "ON") {
      setDataLamp2(true);
    } else {
      setDataLamp2(false);
    }
  }, [GetControl]);
  const submitValve = async () => {
    const data = {
      valve: statusValve,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue = {
      valve: data.valve === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      if (response.data.valve == "ON") {
        setDataValve(true);
      } else {
        setDataValve(false);
      }
      statusValve = !statusValve;
    }
  };
  const getStatusValve = useCallback(async () => {
    const data = await GetControl();

    if (data.data.valve == "ON") {
      setDataValve(true);
    } else {
      setDataValve(false);
    }
  }, [GetControl]);

  const submitBlend = async () => {
    const data = {
      blend: statusBlend,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue = {
      blend: data.blend === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      if (response.data.blend == "ON") {
        setDataBlend(true);
      } else {
        setDataBlend(false);
      }
      statusBlend = !statusBlend;
    }
  };
  const getStatusBlend = useCallback(async () => {
    const data = await GetControl();

    if (data.data.blend == "ON") {
      setDataBlend(true);
    } else {
      setDataBlend(false);
    }
  }, [GetControl]);

  useEffect(() => {
    const totalUser = async () => {
      const getDataTotal = await getAllDataUser();
      setTotalDataUser(getDataTotal.data.total)
    }

    totalUser()
  }, []);


  return (
    <>
      {/* Navbar */}
      <div className="dashboard flex">
        <Sidebar
          toggleViewMode={toggleViewMode}
          toggleNavbar={toggleNavbar}
          activeMenu="Kontrol"
        />
        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} isFilter={false}  name={user.name} />
          <section className="p-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Kontrol Tanamanmu</h3>
              <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>

              <div className="flex flex-wrap justify-start items-center -mx-2 lg:pt-4 pt-2">
                <div className="w-full md:w-1/2 px-2 lg:mb-0 mb-4">
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
                          <h1 className="lg:text-xl text-lg font-medium">Lampu 1</h1>
                          {lamp1 ? <IcLampInact /> : <IcLampAct />}
                          <h1 className="lg:text-xl text-2xl font-semibold">{lamp1 ? "ON" : "OFF"}</h1>

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
                        <h1 className="lg:text-xl text-lg font-medium">Lampu 2</h1>
                          {lamp2 ? <IcLampInact /> : <IcLampAct />}
                          <h1 className="lg:text-xl text-2xl font-semibold">{lamp2 ? "ON" : "OFF"}</h1>
                        </div>
                      </div>
                    </button>
                    <div className="w-1/3 lg:inline none"></div>
                    <button
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                      onClick={submitPump1}

                      type="button"
                    >
                      {/* <div className="col-md-12 card-control"> */}
                      <div
                        className={
                          pump1
                            ? "w-full card-control p-3 justify-center  lg:mr-4 mr-2"
                            : "w-full card-control-off p-3 justify-center  lg:mr-4 mr-10"
                        }
                      >
                        <div className="card-body text-center inline-block">
                          <h1 className="lg:text-xl text-lg font-medium">Pompa 1</h1>
                          {pump1 ? <IcLampInact /> : <IcLampAct />}
                          <h1 className="lg:text-xl text-2xl font-semibold">{pump1 ? "ON" : "OFF"}</h1>

                        </div>
                      </div>
                    </button>
                    <button
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                      onClick={submitPump2}

                      type="button"
                    >
                      {/* <div className="col-md-12 card-control"> */}
                      <div
                        className={
                          pump2
                            ? "w-full card-control p-3 justify-center lg:mr-4 mr-2"
                            : "w-full card-control-off p-3 justify-center lg:mr-4 mr-10"
                        }
                      >
                        <div className="card-body text-center inline-block">
                        <h1 className="lg:text-xl text-lg font-medium">Pompa 2</h1>
                          {pump2 ? <IcLampInact /> : <IcLampAct />}
                          <h1 className="lg:text-xl text-2xl font-semibold">{pump2 ? "ON" : "OFF"}</h1>
                        </div>
                      </div>
                    </button>
                    <div className="w-1/3 lg:inline none"></div>
                    <button
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                      onClick={submitValve}

                      type="button"
                    >
                      {/* <div className="col-md-12 card-control"> */}
                      <div
                        className={
                          valve
                            ? "w-full card-control p-3 justify-center  lg:mr-4 mr-2"
                            : "w-full card-control-off p-3 justify-center  lg:mr-4 mr-10"
                        }
                      >
                        <div className="card-body text-center inline-block">
                          <h1 className="lg:text-xl text-lg font-medium">Valve</h1>
                          {valve ? <IcLampInact /> : <IcLampAct />}
                          <h1 className="lg:text-xl text-2xl font-semibold">{valve ? "ON" : "OFF"}</h1>

                        </div>
                      </div>
                    </button>
                    <button
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                      onClick={submitBlend}

                      type="button"
                    >
                      {/* <div className="col-md-12 card-control"> */}
                      <div
                        className={
                          blend
                            ? "w-full card-control p-3 justify-center lg:mr-4 mr-2"
                            : "w-full card-control-off p-3 justify-center lg:mr-4 mr-10"
                        }
                      >
                        <div className="card-body text-center inline-block">
                        <h1 className="lg:text-xl text-lg font-medium">Blend</h1>
                          {blend ? <IcLampInact /> : <IcLampAct />}
                          <h1 className="lg:text-xl text-2xl font-semibold">{blend ? "ON" : "OFF"}</h1>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-2 lg:mb-0 mb-4">
                <Image src="/images/img-control.png" height={360} width={502} className="img-fluid" alt='img-iot' />

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

interface GetServerSideProps{
  req: {
    cookies:{
      token:string,
    }
  }
}



export async function getServerSideProps({ req }:GetServerSideProps) {
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



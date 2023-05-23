import { useCallback, useEffect, useState } from "react";

import jwtDecode from 'jwt-decode';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, Sidebar } from "../../../components";
import { ControlTypes, JWTPayloadTypes, UserStateTypes } from "../../../services/data-types";

import Image from "next/image";
import io from 'socket.io-client';
import IcContBlend from "../../../public/Icon/Ic-Cont-Blend";
import IcContLamp from "../../../public/Icon/Ic-Cont-Lamp";
import IcContPump from "../../../public/Icon/Ic-Cont-Pump";
import { GetControl, SetControl } from "../../../services/dashboard";

interface UserDataStateTypes {
  user: UserStateTypes;
}

const host: any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function Kontrol(props: UserDataStateTypes) {
  const { user } = props;

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const [statusControl, setStatusControl] = useState(false);
  const [lamp1, setDataLamp1] = useState(false);

  const [lamp2, setDataLamp2] = useState(false);

  const [pump1, setDataPump1] = useState(false);
  const [pump2, setDataPump2] = useState(false);
  const [valve, setDataValve] = useState(false);
  const [blend, setDataBlend] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };

  const submitLamp1 = async () => {
    const dataControl = await GetControl(user.id);

    const data = {
      lamp1: lamp1,
    };

    const dataValue = {
      lamp1: data.lamp1 === true ? "OFF" : "ON",
      status: dataControl.data.status
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      setDataLamp1(!lamp1);
    }
  };
  const getStatusLamp1 = useCallback(async () => {
    const data = await GetControl(user.id);

    if (data.data.lamp1 == "ON") {
      setDataLamp1(true);
    } else {
      setDataLamp1(false);
    }
  }, [GetControl]);

  const submitLamp2 = async () => {
    const dataControl = await GetControl(user.id);

    const data = {
      lamp2: lamp2,
    };

    const dataValue = {
      lamp2: data.lamp2 === true ? "OFF" : "ON",
      status: dataControl.data.status
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      // if (response.data.lamp2 == "ON") {
      //   setDataLamp2(true);
      // } else {
      //   setDataLamp2(false);
      // }
      // lampuStatus2 = !lampuStatus2;
      setDataLamp2(!lamp2);
    }
  };
  const getStatusLamp2 = useCallback(async () => {
    const data = await GetControl(user.id);
console.log("kenapa ihsndoshfoshfs", data)
console.log("kenapa af", user.id)

    if (data.data.lamp2 == "ON") {
      setDataLamp2(true);
    } else {
      setDataLamp2(false);
    }
  }, [GetControl]);

  const submitPump1 = async () => {
    const dataControl = await GetControl(user.id);

    const data = {
      pump1: pump1,
    };

    const dataValue = {
      pump1: data.pump1 === true ? "OFF" : "ON",
      status: dataControl.data.status

    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      setDataPump1(!pump1);
    }
  };
  const getStatusPump1 = useCallback(async () => {
    const data = await GetControl(user.id);

    if (data.data.pump1 == "ON") {
      setDataPump1(true);
    } else {
      setDataPump1(false);
    }
  }, [GetControl]);

  const submitPump2 = async () => {
    const dataControl = await GetControl(user.id);

    const data = {
      pump2: pump2,
    };

    const dataValue = {
      pump2: data.pump2 === true ? "OFF" : "ON",
      status: dataControl.data.status

    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      setDataPump2(!pump2);
    }
  };
  const getStatusPump2 = useCallback(async () => {
    const data = await GetControl(user.id);

    if (data.data.pump2 == "ON") {
      setDataPump2(true);
    } else {
      setDataPump2(false);
    }
  }, [GetControl]);
  const submitValve = async () => {
    const dataControl = await GetControl(user.id);

    const data = {
      valve: valve,
    };

    const dataValue = {
      valve: data.valve === true ? "OFF" : "ON",
      status: dataControl.data.status

    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      setDataValve(!valve);
    }
  };
  const getStatusValve = useCallback(async () => {
    const data = await GetControl(user.id);

    if (data.data.valve == "ON") {
      setDataValve(true);
    } else {
      setDataValve(false);
    }
  }, [GetControl]);

  const submitBlend = async () => {
    const dataControl = await GetControl(user.id);

    const data = {
      blend: blend,
    };

    const dataValue = {
      blend: data.blend === true ? "OFF" : "ON",
      status: dataControl.data.status

    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      setDataBlend(!blend);
    }
  };

  const getStatusBlend = useCallback(async () => {
    const data = await GetControl(user.id);

    if (data.data.blend == "ON") {
      setDataBlend(true);
    } else {
      setDataBlend(false);
    }
  }, [GetControl]);

  const submitStatus = async () => {
    const data = {
      statusControl: statusControl,
    };

    const dataValue = {
      statusControl: data.statusControl === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
      setStatusControl(!statusControl);

      if (dataValue.statusControl == "ON") {
        setDisabled(true);

      } else if (dataValue.statusControl == "OFF") {
        setDisabled(false);

      }
      console.log("oadpad", dataValue.statusControl)
    }
  };
  const getStatusStatus = useCallback(async () => {
    const data = await GetControl(user.id);

    if (data.data.statusControl == "ON") {
      setDisabled(true);

      setStatusControl(true);
    } else {
      setDisabled(false);

      setStatusControl(false);
    }
  }, [GetControl]);

  // const getStatusLampu1 = useCallback(async () => {
  //   const data = await GetControl();

  //   if (data.data.lamp1 == "ON") {
  //     setDataLampu1(true);
  //   } else {
  //     setDataLampu1(false);
  //   }
  // }, [GetControl]);

  // const submitLampu1 = async () => {
  //   const data = {
  //     lamp1: lampu1,
  //   };

  //   const dataValue = {
  //     lamp1: data.lamp1 === true ? "OFF" : "ON",
  //   };

  //   const response = await SetControl(dataValue);

  //   console.log("sasa", data)

  //   if (response.error) {
  //     toast.error(response.message);
  //   } else {
  //     setDataLampu1(!lampu1);
  //     console.log("status lampu", !lampu1)
  //   }
  // };
  const notifyAllert = () => toast.error("Tombol Nonaktif, Ubah Status dalam keadaan OFF");

  useEffect(() => {
    socket.on('dataMessaage', (data) => {
      toast.error(`Nilai : ${data.nilai} | ${data.message}!!!!!!!`, {
        theme: "colored",
      });

    });
    getStatusLamp1()
    getStatusLamp2()
    getStatusPump1()
    getStatusPump2()
    getStatusBlend()
    getStatusValve()
    getStatusStatus()
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="dashboard flex">
        {
          user.status == "admin" ? <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Kontrol"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Kontrol"
          />
        }

        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} isFilter={false} name={user.name}  imageProfile = {user.avatar} />
          <section className="p-3">
            <div className="header">
              <h3 className="text-3xl text-black font-bold">Kontrol Tanamanmu</h3>
              <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              <div className="flex flex-wrap justify-start items-center -mx-2 lg:pt-4 pt-2">
                <div className="w-full md:w-0 px-2 lg:mb-0 mb-4 mt-4 lg:hidden inline">
                  <Image src="/images/img-control.png" height={360} width={502} className="img-fluid" alt='img-iot' />

                </div>
                <div className="w-full md:w-1/2 px-2 lg:mb-0 mb-4">
                  <div className="flex flex-wrap justify-start items-center -mx-2">
                    <div
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                    >
                      <div
                        className="w-full card-control-off px-4 py-3 justify-center  lg:mr-4 mr-10"
                      >
                        <div className="flex justify-between items-center">
                          <IcContLamp />
                          <h1 className={statusControl ? "lg:text-2xl text-2xl font-semibold text-primary1" : "lg:text-2xl text-2xl font-semibold text-grey3"}>{statusControl ? "ON" : "OFF"}</h1>
                        </div>
                        <h1 className="mt-2 text-sm text-grey2">Kebun</h1>
                        <h1 className="lg:text-xl text-lg font-medium text-black mb-2">status</h1>
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={statusControl}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              submitStatus();
                            }}
                            className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                          ></div>
                        </label>
                      </div>
                    </div>
                    <div
                      className="lg:w-1/3 w-0 btn-control lg:px-2 px-0"
                    ></div>
                    <div
                      className="lg:w-1/3 w-0 btn-control lg:px-2 px-0"
                    ></div>
                    <div
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                    >
                      <div
                        className="w-full card-control-off px-4 py-3 justify-center  lg:mr-4 mr-10"
                      >
                        <div className="flex justify-between items-center">
                          <IcContLamp />
                          <h1 className={lamp1 ? "lg:text-2xl text-2xl font-semibold text-primary1" : "lg:text-2xl text-2xl font-semibold text-grey3"}>{lamp1 ? "ON" : "OFF"}</h1>
                        </div>
                        <h1 className="mt-2 text-sm text-grey2">Kebun</h1>

                        <h1 className="lg:text-xl text-lg font-medium text-black mb-2">Lampu 1</h1>
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={lamp1}

                            readOnly
                          />
                          <div
                            onClick={() => {
                              disabled !== true ? submitLamp1() : notifyAllert();
                            }}

                            className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                          ></div>
                        </label>
                      </div>
                    </div>
                    <div
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                    >
                      <div
                        className="w-full card-control-off px-4 py-3 justify-center  lg:mr-4 mr-10"
                      >
                        <div className="flex justify-between items-center">
                          <IcContLamp />
                          <h1 className={lamp2 ? "lg:text-2xl text-2xl font-semibold text-primary1" : "lg:text-2xl text-2xl font-semibold text-grey3"}>{lamp2 ? "ON" : "OFF"}</h1>
                        </div>

                        <h1 className="mt-2 text-sm text-grey2">Kebun</h1>
                        <h1 className="lg:text-xl text-lg font-medium text-black mb-2">Lampu 2</h1>
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={lamp2}
                            disabled={true}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              disabled !== true ? submitLamp2() : notifyAllert();
                            }}
                            className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                          ></div>
                        </label>
                      </div>
                    </div>
                    <div
                      className="lg:w-1/3 w-0 btn-control lg:px-2 px-0"
                    ></div>
                    <div
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                    >
                      <div
                        className="w-full card-control-off px-4 py-3 justify-center  lg:mr-4 mr-10"
                      >
                        <div className="flex justify-between items-center">
                          <IcContPump />
                          <h1 className={pump1 ? "lg:text-2xl text-2xl font-semibold text-primary1" : "lg:text-2xl text-2xl font-semibold text-grey3"}>{pump1 ? "ON" : "OFF"}</h1>
                        </div>

                        <h1 className="mt-2 text-sm text-grey2">Kebun</h1>
                        <h1 className="lg:text-xl text-lg font-medium text-black mb-2">Pompa 1</h1>
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={pump1}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              disabled !== true ? submitPump1() : notifyAllert();
                            }}
                            className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                          ></div>
                        </label>
                      </div>
                    </div>

                    <div
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                    >
                      <div
                        className="w-full card-control-off px-4 py-3 justify-center  lg:mr-4 mr-10"
                      >
                        <div className="flex justify-between items-center">
                          <IcContPump />
                          <h1 className={pump2 ? "lg:text-2xl text-2xl font-semibold text-primary1" : "lg:text-2xl text-2xl font-semibold text-grey3"}>{pump2 ? "ON" : "OFF"}</h1>
                        </div>

                        <h1 className="mt-2 text-sm text-grey2">Kebun</h1>
                        <h1 className="lg:text-xl text-lg font-medium text-black mb-2">Pompa 2</h1>
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={pump2}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              disabled !== true ? submitPump2() : notifyAllert();
                            }}
                            className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                          ></div>
                        </label>
                      </div>
                    </div>

                    <div
                      className="lg:w-1/3 w-0 btn-control lg:px-2 px-0"
                    ></div>

                    <div
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                    >
                      <div
                        className="w-full card-control-off px-4 py-3 justify-center  lg:mr-4 mr-10"
                      >
                        <div className="flex justify-between items-center">
                          <IcContPump />
                          <h1 className={valve ? "lg:text-2xl text-2xl font-semibold text-primary1" : "lg:text-2xl text-2xl font-semibold text-grey3"}>{valve ? "ON" : "OFF"}</h1>
                        </div>

                        <h1 className="mt-2 text-sm text-grey2">Kebun</h1>
                        <h1 className="lg:text-xl text-lg font-medium text-black mb-2">Valve</h1>
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={valve}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              disabled !== true ? submitValve() : notifyAllert();
                            }}
                            className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                          ></div>
                        </label>
                      </div>
                    </div>

                    <div
                      className="lg:w-1/3 w-1/2 btn-control px-2"
                    >
                      <div
                        className="w-full card-control-off px-4 py-3 justify-center  lg:mr-4 mr-10"
                      >
                        <div className="flex justify-between items-center">
                          <IcContBlend />
                          <h1 className={blend ? "lg:text-2xl text-2xl font-semibold text-primary1" : "lg:text-2xl text-2xl font-semibold text-grey3"}>{blend ? "ON" : "OFF"}</h1>
                        </div>

                        <h1 className="mt-2 text-sm text-grey2">Kebun</h1>
                        <h1 className="lg:text-xl text-lg font-medium text-black mb-2">Blend</h1>
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={blend}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              disabled !== true ? submitBlend() : notifyAllert();
                            }}
                            className="w-20 h-10 bg-grey3 rounded-full peer  peer-focus:ring-primary1  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-grey3 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-primary1"
                          ></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-2 lg:mb-0 mb-4 lg:inline hidden">
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



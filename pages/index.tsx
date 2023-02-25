import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AOS from 'aos';  

import Image from "next/image";
import { ControlTypes } from "../services/data-types";
import { GetControl, SetControl } from "../services/dashboard";
import { toast } from "react-toastify";

export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const [lamp1, setDataLamp1] = useState(false);

  var lampuStatus = lamp1;


  const submitLamp1 = async () => {
    const data = {
      lamp1: lampuStatus,
      // lamp2: dataLamp2 === "ON" ? "OFF" : "ON",
    };

    const dataValue: Partial<ControlTypes> = {
      lamp1: data.lamp1 === true ? "OFF" : "ON",
    };

    const response = await SetControl(dataValue);

    if (response.error) {
      toast.error(response.message);
    } else {
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


  useEffect(() => {
    // getStatusLamp1()
    AOS.init();
  }, []);
  return (
    <>
      <div className="container">
      {/* <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="flex">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={lamp1}
                        readOnly
                    />
                    <div
                        onClick={() => {
                          submitLamp1();
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                        ON
                    </span>
                </label>
            </div>
        </div> */}
        <div className=" flex h-screen">
          <div className="m-auto text-center">
            <div data-aos="zoom-in">
              <Image src="/images/img-welcom.png" className="img-fluid inline" height={400} width={500} alt='robot' />
            </div>
            <h1 className="title-home-page font-semibold mt-3">
              Selamat Datang Petani Modern
            </h1>
            <h1 className="sub-title-home-page md:mt-6 mt-2 md:mb-8 mb-6">
              Ayo gunakan teknologi internet of things <br />
              untuk sistem smart green house kamu
            </h1>
            <Link href='/sign-in' legacyBehavior>
              <a className="btn btn-get-started">
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

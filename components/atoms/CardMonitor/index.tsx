import React, { useEffect, useState } from "react";
import { IcParameter, IcPemantauan } from "../../../public/Icon";
import ReactLoading from "react-loading";
import cx from "classnames";
import Image from "next/image";


export default function CardMonitor({ value=654, isLoading, title, margin }: any) {
  const [valuee, setValuee] = useState(765);
  const classItem = cx({
    "card-monitoring": true,
    margin
  });
  useEffect(()  => {
    // setValuee(value);
  })
  return (
    <div className="lg:w-1/3 w-1/2 px-2">
      <div className={classItem}>
        <div className="card-body">
          <h1>{title}</h1>
          <div className="flex justify-start items-center">
            <div className="lg:mr-4 mr-2">
              {/* <IcPemantauan /> */}
                <img src="/Icon/ic-pemantauan.svg" alt="" className="lg:h-20 lg:w-20 h-14"/>
            </div>
            <div className="block">
              {isLoading ? (
                <ReactLoading
                  type="spinningBubbles"
                  color="#ffffff"
                  height={40}
                  width={40}
                // className="justify-content-center text-center"
                />
              ) : (
                <div className="lg:text-3xl text-xl font-medium text-primary1">{valuee}</div>
              )}
              <div className="text-grey2 lg:text-base text-sm font-medium">Celcius</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

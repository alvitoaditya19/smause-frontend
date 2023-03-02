import React, { useEffect, useState } from "react";
import { IcParameter, IcPemantauan } from "../../../public/Icon";
import ReactLoading from "react-loading";
import cx from "classnames";
import Image from "next/image";


export default function CardMonitor({ value, isLoading, title, margin }: any) {
  const classItem = cx({
    "bg-background2 p-5 rounded-2xl mt-4": true,
    margin
  });
  useEffect(()  => {
    // setValuee(value);
  })
  return (
    <div className="lg:w-1/4 w-1/2 px-2 ">
      <div className={classItem}>
        <div className="p-0 card-body">
          <h1 className="lg:text-lg text-base text-black mb-2 font-medium">{title}</h1>
          <div className="flex justify-start items-center">
            <div className="lg:mr-4 mr-2">
              {/* <IcPemantauan /> */}
                <img src="/Icon/ic-pemantauan.svg" alt="" className="lg:h-20 lg:w-20 h-14"/>
            </div>
            <div className="block">
              {isLoading ? (
                <ReactLoading
                  type="spinningBubbles"
                  color="#174AFF"
                  height={40}
                  width={40}
                // className="justify-content-center text-center"
                />
              ) : (
                <div className="lg:text-3xl text-xl font-medium text-primary1">{value}</div>
              )}
              <div className="text-grey2 text-sm font-medium">Celcius</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

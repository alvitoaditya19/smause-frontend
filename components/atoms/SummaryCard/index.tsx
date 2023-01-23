import React from "react";

export interface  SummaryCardProps {
  title: string;
  total: string;
  icon: JSX.Element;
}
export default function SummaryCard({title, total, icon}:SummaryCardProps) {
  return (
    <>
      <div className="w-full md:w-1/3 px-3 lg:mb-0 mb-4">
        <div className="summary-card">
          <div className="flex items-center mb-6">
           {icon}
            <p className="mb-0 mx-3 text-lg text-black font-medium">
             Jumlah
              <br /> {title}
            </p>
          </div>
          <div>
            <p className="text-sm text-grey2 mb-1">Total</p>
            <p className="text-4xl text-primary1 font-medium mt-1">{total}</p>
          </div>
        </div>
      </div>
    </>
  );
}

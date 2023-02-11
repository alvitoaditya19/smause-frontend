import React from "react";
import ReactLoading from "react-loading";

export interface  SummaryCardProps {
  title: string;
  total: number;
  icon: JSX.Element;
  isLoading: boolean
}
export default function SummaryCard({title, total, icon,isLoading}:SummaryCardProps) {
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
            {isLoading ? (
           
                <ReactLoading
                  type="spinningBubbles"
                  color="#4D17E2"
                  height={40}
                  width={40}
                />
           ) :(
              <p className="text-4xl text-primary1 font-medium mt-1">{total}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

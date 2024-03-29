import AOS from 'aos';
import Link from "next/link";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function Home() {
  useEffect(() => {
    AOS.init(); 
  }, []);
  return (
    <>
      <div className="container">
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
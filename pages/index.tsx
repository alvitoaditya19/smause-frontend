import AOS from 'aos';
import Link from "next/link";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import Image from "next/image";


const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function Home() {
  const [tesData, setTesData] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    AOS.init(); 
  }, []);
  useEffect(() => {

    socket.on('connection', () => {
      console.log('connected to server');
      setIsConnected(true);
    });

    socket.on('message', (data) => {
      console.log("dataaa dong", data)
      setTesData(data)
    });

    socket.on('data', (data) => {
      console.log("dataaa wair", data)
    });


  },[])

  const sendMessage = () => {

    // socket.emit("message", "hey it worked")
  }
  return (
    <>
      <div className="container">
        <div className=" flex h-screen">
          <div className="m-auto text-center">
            <div data-aos="zoom-in">
              <Image src="/images/img-welcom.png" className="img-fluid inline" height={400} width={500} alt='robot' />
            </div>
           
      <h1>Connected: {isConnected}</h1>
      <h1>tesData: {tesData}</h1>
        
            <h1 className="title-home-page font-semibold mt-3">
              Selamat Datang Petani Modern
            </h1>
            <h1 className="sub-title-home-page md:mt-6 mt-2 md:mb-8 mb-6">
              Ayo gunakan teknologi internet of things <br />
              untuk sistem smart green house kamu
            </h1>
            <button className='btn btn-get-started' onClick={sendMessage}>
              coba dong
            </button>
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

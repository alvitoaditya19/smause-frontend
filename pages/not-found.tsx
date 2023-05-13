import Link from "next/link";

import Image from "next/image";

export default function NotFound() {


  return (
    <>
      <div className="container">
        <div className=" flex h-screen">
          <div className="m-auto text-center justify-center">
              <Image src="/images/not-found.png" className="img-fluid inline" height={320} width={370} alt='robotss' />
            <h1 className="title-home-page font-semibold mt-3">
              Halaman Tidak Ditemukan!!!
            </h1>
            <h1 className="sub-title-home-page md:mt-6 mt-2 md:mb-8 mb-6">
              Halaman yang anda kunjungi Sudah 
              <br />
              Tidak Tersedia di Server Kami
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

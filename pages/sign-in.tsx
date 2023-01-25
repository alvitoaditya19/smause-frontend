import Image from 'next/image';
import Link from 'next/link';
import { SignInForm } from '../components/molecules';
import { IcLogoIOT } from "../public/Icon";

export default function SignIn() {
  return (
    <>
      <section className="sign-in mx-auto">
        <div className="flex">
          <div className="lg:w-1/2 pr-4 pl-4 lg:pt-12 lg:pb-12 pt-7 pb-11 px-0">
            <form action="">
              <div className="container mx-auto">
                <div className="pb-12 flex items-center justify-center">
                  <IcLogoIOT />
                </div>
                <SignInForm />
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 pr-4 pl-4 bg-blue text-center lg:pt-[60px] lg:pb-[100px] lg:flex hidden relative">
            <div className="container m-auto">
              <div className="flex items-center justify-center" data-aos="zoom-in">
                <Image src="/images/img-cover-sign-in.png" height={360} width={502} className="img-fluid" alt='img-iot' />
              </div>
              <h2 className="text-4xl font-bold text-white mb-8 pt-12">
                Sistem Green House Modern.
                <br />
                Dengan Teknologi  IoT.
              </h2>
              <p className="text-white m-0">
                Teknologi IoT pada sistem smart 
                <br /> green house dapat menghasilkan 
                <br />
                kualitas sayuran yang terbaik
              </p>`
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

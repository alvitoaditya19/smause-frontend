import Image from 'next/image';
import Link from 'next/link';
import { SignInForm } from '../components/molecules';
import { IcLogoIOT } from "../public/Icon";

export default function SignIn() {
  return (
    <>
      <section className="sign-in mx-auto">
        <div className="row">
          <div className="lg:w-1/2 pr-4 pl-4 my-auto lg:pt-12 lg:pb-12 pt-7 pb-11 px-0">
            <form action="">
              <div className="container mx-auto">
                <div className="pb-12 flex items-center justify-center">
                  <IcLogoIOT />
                </div>
                <SignInForm />
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 pr-4 pl-4 bg-blue text-center lg:pt-[145px] lg:pb-[145px] lg:flex hidden relative">
            <div className="container m-auto">
              <div className="flex items-center justify-center" data-aos="zoom-in">
                <Image src="/images/img-cover-sign-in.png" height={360} width={502} className="img-fluid" alt='img-iot' />
              </div>
              <h2 className="text-4xl font-bold text-white mb-8 pt-12">
                Go To Digital World.
                <br />
                With IoT Technology.
              </h2>
              <p className="text-white m-0">
                Let’s to connect with our IoT
                <br /> technology for your garden system
                <br />
                for the best vegetable
              </p>`
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

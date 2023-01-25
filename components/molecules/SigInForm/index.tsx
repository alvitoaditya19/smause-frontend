import { useRouter } from "next/router";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLogin } from "../../../services/auth";
import jwt_decode from "jwt-decode";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    const data = {
      email,
      password,
    };

    if (!email || !password) {
      toast.error("Email dan Password wajib diisi!!!!!");
    } else {
      const response = await setLogin(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        const { token } = response.data;
        let decodedHeader: any = jwt_decode(token);
        let statusUser = decodedHeader.user.status;
        console.log("statusku : ", statusUser)
  
        if (statusUser == "user") {
          toast.error('Anda tidak diizinkan untuk mengakses sistem dashboard ini');
  
          router.push('/not-found');
        } else if(statusUser == "admin"){
          toast.success('Login Berhasil');
          // const { token } = response.data;
          const tokenBase64 = btoa(token);
          Cookies.set('token', tokenBase64, { expires: 1 });
          router.push('/dashboard');
        }
      }
    }
  };
  return (
    <>
      <h2 className="lg:text-3xl text-2xl font-bold text-black mb-3 text-center">Sign In</h2>
      <p className="lg:text-lg text-black mb-10 text-center text-base">
        Silakan Masuk untuk Mengakses Dasboard Anda
      </p>
      <div className=" bg-background3 p-6 rounded-3xl">
        <div className="pt-0">
          <label
            htmlFor="email"
            className="form-label text-lg fw-medium text-black mb-3"
          >
            Email Address
          </label>
          <input
            type="email"
            className="form-control rounded-full text-lg bg-background4"
            placeholder="Masukkan alamat email anda"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="pt-8">
          <label
            htmlFor="password"
            className="form-label text-lg fw-medium text-black mb-3"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-full text-lg bg-background4"
            placeholder="Masukkan password anda"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="button-group d-flex flex-column mx-auto pt-8">
          {/* <button
            type="button"
            className="btn btn-sign-in fw-medium text-lg text-white rounded-full mb-4"
            // onClick={onSubmit}
          >
            Continue to Sign In
          </button> */}
          <button
            type="button"
            className="btn btn-sign-in font-medium text-lg text-white rounded-full mb-4"
            onClick={onSubmit}
          >
            Continue to Sign In
          </button>
          <Link href="/" legacyBehavior>
            <a
              className="btn btn-go-home font-medium text-lg text-black rounded-full"
              role="button"
            >
              Go To Home Page
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

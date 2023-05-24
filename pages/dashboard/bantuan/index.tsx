
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { Header, Sidebar } from "../../../components";
import Image from "next/image";
import { JWTPayloadTypes, UserStateTypes } from "../../../services/data-types";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';


interface UserDataStateTypes {
    user: UserStateTypes;
}

const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function Help(props: UserDataStateTypes) {
    const { user } = props;

    const [toggleViewMode, setToggleViewMode] = useState(false);
    const toggleNavbar = () => {
        setToggleViewMode(!toggleViewMode);
    };

    useEffect(() => {
        socket.on('dataMessaage', (data) => {
            if (data.userId === user.id) {
              toast.error(`Nilai : ${data.data.nilai} | ${data.data.message}!!!!!!!`, {
                theme: "colored",
              });
            }
          });
    }, []);

    return (
        <>
            {/* Navbar */}
            <div className="dashboard d-flex">
                {
                    user.status == "admin" ? <Sidebar
                        toggleViewMode={toggleViewMode}
                        toggleNavbar={toggleNavbar}
                        activeMenu="Bantuan"
                        statusAdmin
                    /> : <Sidebar
                        toggleViewMode={toggleViewMode}
                        toggleNavbar={toggleNavbar}
                        activeMenu="Bantuan"
                    />
                }
                {/* Main Content */}
                <div className="content">
                    <Header toggleNavbar={toggleNavbar} imageProfile = {user.avatar}  name={user.name}  filterBySearch={function (event: ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.");
                    }} isFilter={false} />
                    <div className="container">
                        <div className=" flex h-screen">
                            <div className="m-auto text-center justify-center">
                                <Image src="/images/img-robot.png" className="img-fluid inline" height={500} width={500} alt='robot' />
                                <h1 className="title-home-page font-semibold mt-3">
                                    Kamu perlu bantuan???
                                </h1>
                                <h1 className="sub-title-home-page md:mt-6 mt-2 md:mb-8 mb-6">
                                    Silahkan hubungi admin utama dengan <br />
                                    menekan tombol dibawah ini
                                </h1>
                                <Link href='https://wa.me/+6282297145285' legacyBehavior>
                                    <a className="btn btn-get-started">
                                        Hubungi Admin
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


interface GetServerSideProps {
    req: {
        cookies: {
            token: string,
        }
    }
}



export async function getServerSideProps({ req }: GetServerSideProps) {
    const { token } = req.cookies;
    if (!token) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }

    const jwtToken = Buffer.from(token, 'base64').toString('ascii');
    const payload: JWTPayloadTypes = jwtDecode(jwtToken);

    const userFromPayload = payload.user;
    const IMG = process.env.NEXT_PUBLIC_IMG;
    userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
    return {
        props: {
            user: userFromPayload,
        },
    };
}

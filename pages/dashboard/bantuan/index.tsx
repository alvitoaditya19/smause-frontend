
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Header, Sidebar } from "../../../components";
import Image from "next/image";

export default function Help() {
    const [toggleViewMode, setToggleViewMode] = useState(false);
    const toggleNavbar = () => {
        setToggleViewMode(!toggleViewMode);
    };

    return (
        <>
            {/* Navbar */}
            <div className="dashboard d-flex">
                <Sidebar
                    toggleViewMode={toggleViewMode}
                    toggleNavbar={toggleNavbar}
                    activeMenu="Bantuan"
                />
                {/* Main Content */}
                <div className="content">
                    <Header toggleNavbar={toggleNavbar} filterBySearch={function (event: ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.");
                    } } isFilter={false} />
                    <div className="container">
                        <div className=" flex h-screen">
                            <div className="m-auto text-center justify-center">                       
                                <Image src="/images/img-robot.png" className="img-fluid inline" height={300} width={400} alt='robot' />
                                <h1 className="title-home-page font-semibold mt-3">
                                    Kamu perlu bantuan???
                                </h1>
                                <h1 className="sub-title-home-page md:mt-6 mt-2 md:mb-8 mb-6">
                                    Silahkan hubungi admin utama dengan <br />
                                    menekan tombol dibawah ini
                                </h1>
                                <Link href='/sign-in' legacyBehavior>
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
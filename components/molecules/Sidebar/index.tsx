import { SidebarItem } from "../../atoms";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export interface SidebarProps {
  toggleViewMode: boolean;
  activeMenu: string;
  toggleNavbar: any;
}
export default function Sidebar({ toggleViewMode, activeMenu, toggleNavbar }: SidebarProps) {
  const router = useRouter();
  const onLogOut = () => {
    Cookies.remove('token');
    router.push('/');
  };
  return (
    <>
      <div className={toggleViewMode ? "sidebar active" : "sidebar"}>
        <div className="d-flex justify-content-center pt-14 pb-10">
          {/* <img src="/images/logo.svg" alt="Logo" width="140px" height="40px" /> */}
          <img
            src="/Icon/ic_iot_act.svg"
            alt="Logo"
            width="180px"
            height="60px"
          />
        </div>
        <div className="pt-2 d-flex flex-column gap-5">
          <div className="menu">
            <p>Menu Utama</p>
            <SidebarItem
              icon="icon ic-dashboard"
              title="Dashboard"
              href="/dashboard"
              active={activeMenu == "Dashboard"}
            />
            <SidebarItem
              icon="icon ic-user"
              title="Pengguna"
              href="/dashboard/pengguna"
              active={activeMenu == "Pengguna"}
            />
            <SidebarItem
              icon="icon ic-water"
              title="Air"
              href="/dashboard/air"
              active={activeMenu == "Air"}
            />
            <SidebarItem
              icon="icon ic-tanah"
              title="Tanah"
              href="/dashboard/tanah"
              active={activeMenu == "Tanah"}
            />
            <SidebarItem
              icon="icon ic-udara"
              title="Udara"
              href="/dashboard/udara"
              active={activeMenu == "Udara"}
            />
          </div>
          <div className="menu">
            <p>Others</p>
            <SidebarItem
              icon="icon ic-setting"
              title="Pengaturan"
              href="/dashboard/pengaturan"
              active={activeMenu == "Pengaturan"}
            />
            <SidebarItem
              icon="icon ic-help"
              title="Bantuan"
              href="/dashboard/bantuan"
              active={activeMenu == "Bantuan"}
            />
            <SidebarItem
              icon="icon ic-out"
              title="Keluar"

              active={activeMenu == "Keluar"}
              onClick={onLogOut}
            />
          </div>
        </div>
      </div>
    </>
  );
}

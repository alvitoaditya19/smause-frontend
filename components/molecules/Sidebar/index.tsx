import { SidebarItem } from "../../atoms";

export interface  SidebarProps {
  toggleViewMode: boolean;
  activeMenu: string;
  toggleNavbar: any;
}
export default function Sidebar({ toggleViewMode, activeMenu,toggleNavbar }:SidebarProps) {
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
          </div>
          <div className="menu">
            <p>Others</p>
            <SidebarItem
              icon="icon ic-temp"
              title="Settings"
              href="/dashboard/setting"
              active={activeMenu == "setting"}
            />
            <a href="#" className="item-menu">
              <i className="icon ic-help"></i>
              Help
            </a>
            <a href="#" className="item-menu">
              <i className="icon ic-logout"></i>
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

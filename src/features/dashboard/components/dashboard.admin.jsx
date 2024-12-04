import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "./layout.menu.jsx";
import Button from "../../../components/ui/Button.jsx";
import NavbarDashboard from "./header.dashboard.jsx";

// Icon
import { MdOutlineLogout } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { FaFileCirclePlus } from "react-icons/fa6";
import { RiSettings5Fill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";

import logo from "../../../assets/logo/logo-only.png";
import useLogout from "../../auth/hooks/useLogout.jsx";

export default function DashboardAdminContainer({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { handleLogout } = useLogout();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Fungsi untuk toggle dropdown
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen">
      {/* Button untuk membuka sidebar */}
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Overlay untuk menutup sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-300 opacity-50"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white text-black border-r-2 border-gray ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-7 px-2">
              <img src={logo} alt="" className="w-8" />
              <span className="font-semibold text-2xl font-inter">Greenly</span>
            </Link>
            <ul className="mb-2 font-medium mt-4">
              <li><Menu label="Beranda" href="/dashboard-admin" icon={<MdHome size={24} />} /></li>
              <li><Menu label="Data Pengguna" href="/dashboard/user" icon={<IoPersonSharp size={24} />} /></li>
              <li><Menu label="Data Pelaporan" href="/dashboard/report/all" icon={<FaFileCirclePlus size={24} />} /></li>
              <li><Menu label="Kelola Artikel" href="/" icon={<IoNewspaperOutline size={24} />} /></li>
            </ul>

          </div>
          <Button variant="transparent" onClick={handleLogout} textPosition="left" size="xs" >
            <MdOutlineLogout size={24} />
            <span className="text-base font-medium">Keluar</span>
          </Button>
        </div>
      </aside>

      {/* Konten Utama */}
      <div className="md:p-0 sm:ml-64">
        <NavbarDashboard />
        {children}
      </div>
    </div>
  );
}
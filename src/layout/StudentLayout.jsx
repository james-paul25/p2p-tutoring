import React, { useState, useRef, useEffect } from "react";
import ProfilePic from "../assets/prof.jpg";
import {
  Menu,
  Home,
  MessageSquare,
  User,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const StudentLayout = ({ onLogout, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-100">
      <aside
        className={`fixed md:static top-0 left-0 h-full ${
          collapsed ? "w-20" : "w-50"
        } bg-white border-r p-4 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out md:translate-x-0 flex flex-col justify-between`}
      >
        <div>
          <div className="flex justify-between items-center mb-6">
            {!collapsed && (
              <h2 className="text-xl font-bold whitespace-nowrap">Student Panel</h2>
            )}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="md:block hidden p-1 rounded hover:bg-gray-100 hover:text-blue-600 transition cursor-pointer"
                title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                {collapsed ? (
                    <ChevronsRight className="h-5 w-5" />
                ) : (
                    <ChevronsLeft className="h-5 w-5" />
                )}
            </button>
          </div>

          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
              <Home className="h-5 w-5" />
              {!collapsed && <span>Home</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
              <MessageSquare className="h-5 w-5" />
              {!collapsed && <span>Messages</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
              <User className="h-5 w-5" />
              {!collapsed && <span>Profile</span>}
            </li>
          </ul>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold">Welcome Student</h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    alert("Go to Settings");
                    setDropdownOpen(false);
                  }}
                >
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default StudentLayout;

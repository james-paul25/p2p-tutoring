import React, { useState, useRef, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ProfilePic from "../assets/prof.jpg";
import {
  Menu,
  Home,
  MessageSquare,
  User,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  GraduationCap,
  School,
  LogOut,
  Settings
} from "lucide-react";
import { fetchProfilePicture } from "../services/profilePictureService";

const StudentLayout = ({ onLogout, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dropdownRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchData = async () => {
      try {
        const [profile] = await Promise.all([
          fetchProfilePicture(user.userId)
        ]);

        setProfilePicture(`http://localhost:8080${profile.filePath}`);
  
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
  
    fetchData();
  }, [user.userId]);
    
  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-100">    
      <aside
        className={`fixed md:static top-0 left-0 h-full ${
          collapsed ? "w-20" : "w-52"
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
              className="md:block hidden p-1 rounded hover:bg-gray-100 hover:text-blue-600 transition"
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
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded hover:text-blue-600 hover:bg-gray-100 transition ${
                    isActive ? "text-blue-600 bg-gray-100" : "text-gray-700"
                  }`
                }
              >
                <Home className="h-5 w-5" />
                {!collapsed && <span>Home</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/message"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded hover:text-blue-600 hover:bg-gray-100 transition ${
                    isActive ? "text-blue-600 bg-gray-100" : "text-gray-700"
                  }`
                }
              >
                <MessageSquare className="h-5 w-5" />
                {!collapsed && <span>Messages</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/session"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded hover:text-blue-600 hover:bg-gray-100 transition ${
                    isActive ? "text-blue-600 bg-gray-100" : "text-gray-700"
                  }`
                }
              >
                <Clock className="h-5 w-5" />
                {!collapsed && <span>Session</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutors"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded hover:text-blue-600 hover:bg-gray-100 transition ${
                    isActive ? "text-blue-600 bg-gray-100" : "text-gray-700"
                  }`
                }
              >
                <School className="h-5 w-5" />
                {!collapsed && <span>Tutors</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-30 md:hidden"
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
                <GraduationCap className="w-6 h-6 text-purple-600" />
                <h1 className="text-lg font-semibold">Welcome { user.username }!</h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <img
              src={profilePicture || ProfilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    alert("Go to Settings");
                    setDropdownOpen(false);
                  }}
                >
                  <Settings className="h-4 w-4 text-gray-600" />
                  <span>Settings</span>
                </button>

                <NavLink
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 transition ${
                      isActive ? "text-blue-600 bg-gray-100" : "text-gray-700"
                    }`
                  }
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </NavLink>

                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;

import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { getUserDetails, logOut } from "../helper/SessionHelper";
const MainLayOut = (props) => {
  const [show, setShow] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State to track whether the search bar is focused
  const [isFocused, setIsFocused] = useState(false);

  const [active, setActive] = useState(false);

  // Event handlers for focus and blur events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <div className="w-full px-10 py-5 bg-secondary">
      {/* Navigation bar */}
      <nav className="flex items-center justify-between p-4 bg-secondary">
        {/* Sidebar toggle start */}
        <div className="flex items-center">
          {sidebarOpen ? (
            <IoCloseSharp
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-3xl text-white cursor-pointer"
            />
          ) : (
            <FaBarsStaggered
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-3xl text-white cursor-pointer"
            />
          )}
          <NavLink to="/" className="ml-4 text-2xl font-bold text-white">
            Daily Schedule
          </NavLink>
        </div>
        {/* Sidebar toggle end */}

        {/* Search bar */}
        <div className="flex items-center justify-center w-1/2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full outline-none pl-10 py-2 rounded-full shadow-md ${
                isFocused
                  ? "bg-white-500 opacity-100 transition-all duration-300 ease-in-out"
                  : "transition-all duration-300 ease-in-out bg-white-500 opacity-70"
              }`}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {/* Search icon positioned to the right of the input */}
            <FiSearch
              className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
              size={24}
            />
          </div>
        </div>

        {/* Profile view start */}
        <div className="relative">
          <div onClick={() => setShow(!show)} className="cursor-pointer">
            <div className="w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
              <img
                src={getUserDetails()?.photo}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {show && (
            <div className="absolute right-0 p-4 bg-gray-800 rounded-lg shadow-lg top-12 w-72">
              <IoCloseSharp
                onClick={() => setShow(false)}
                className="absolute text-xl text-white cursor-pointer top-2 right-2"
              />
              <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full bg-primary">
                <img
                  src={getUserDetails()?.photo}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <h1 className="mb-4 text-xl font-bold text-white">
                <span>{getUserDetails()?.firstName}</span>{" "}
                <span>{getUserDetails()?.lastName}</span>
              </h1>
              <div className="mb-2">
                <Link
                  to="/profileDetails"
                  className="block w-full py-2 font-semibold text-center text-white bg-gray-700 rounded-lg hover:opacity-90"
                >
                  Profile View
                </Link>
              </div>
              <button
                onClick={() => logOut()}
                className="w-full py-2 font-semibold text-white bg-red-500 rounded-lg hover:opacity-90"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
        {/* Profile view end */}
      </nav>

      {/* Main content start */}
      <div className="flex py-4 space-x-4">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out py-4 ${
            sidebarOpen
              ? "w-[5%] p-2 bg-tertiary h-screen rounded-lg"
              : "w-[20%] p-2 bg-tertiary h-screen rounded-lg"
          }`}
        >
          {sidebarOpen ? (
            <div className="transition-all duration-100 ease-in-out">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] text-[30px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] text-[30px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                <FaHome />
              </NavLink>

              <NavLink
                to="/createTodo"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] text-[30px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] text-[30px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                <IoIosCreate />
              </NavLink>
            </div>
          ) : (
            <div className="transition-all duration-100 ease-in-out">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                home
              </NavLink>

              <NavLink
                to="/createTodo"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                create Todo
              </NavLink>

              <NavLink
                to="/newTodo"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                New Todo
              </NavLink>

              <NavLink
                to="/progressTodo"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                progress Todo
              </NavLink>

              <NavLink
                to="/completedTodo"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                completed Todo
              </NavLink>

              <NavLink
                to="/cancleTodo"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                cancle Todo
              </NavLink>

              <NavLink
                to="/newStatus"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                new Status
              </NavLink>

              <NavLink
                to="/profileEdit"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize bg-[#374151] rounded-lg"
                    : "py-2 my-[5px] transition-all duration-100 block ease-in-out px-2 w-[100%] font-semibold text-white capitalize rounded-lg"
                }
              >
                Settings & Edit Profile
              </NavLink>
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          className={`transition-all rounded-lg duration-300 ease-in-out ${
            sidebarOpen
              ? "w-[95%] p-5 bg-quaternary"
              : "w-[80%] p-5 rounded-lg bg-quaternary"
          }`}
        >
          {props.children}
        </div>
      </div>
      {/* Main content end */}
    </div>
  );
};

export default MainLayOut;

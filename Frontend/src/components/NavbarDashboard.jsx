import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import arrow_up from "../assets/arrow_up.png";
import arrow_down from "../assets/arrow_down.png";


const NavbarDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [arrow, setArrow] = useState(arrow_down)

  useEffect(() => {
    setTimeout(() => {
      setCurrentUser({ username: "JohnDoe" });
    }, 1000);
  }, []);

  const handleDropdownClick = () => {
    setDropdownOpen((prev) => !prev);
    setArrow(arrow === arrow_down ? arrow_up : arrow_down)
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center sticky top-5 z-10">
      <nav className="w-[65%] py-4 px-12 bg-[rgba(5,7,10,0.4)] backdrop-blur-3xl text-white border-2 border-[hsla(220, 20%, 25%, 0.6)] rounded-3xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Decentraland</h1>
          <ul className="flex space-x-6 items-center justify-center">
            <li>
              <NavLink to="/dashboard" className="hover:text-gray-200">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:text-gray-200">
                ChatBot
              </NavLink>
            </li>
            <li>
              {currentUser ? (
                <div className="relative flex items-center justify-center" ref={dropdownRef}>
                  <button
                    onClick={handleDropdownClick}
                    className="flex items-center justify-center">
                    <h3 className="px-2 border-2 border-gray-20 mr-2 rounded-xl">{currentUser.username}</h3>
                    <img className="h-[15px]" src={arrow} alt="Dropdown Toggle" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full right-0 w-[120px] bg-white text-black shadow-lg rounded-md mt-2">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/signup"
                  className="text-black bg-white px-4 py-2 rounded-3xl"
                >
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarDashboard;

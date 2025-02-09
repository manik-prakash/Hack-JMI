import React from "react";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <div className="text-white min-h-screen flex justify-center items-center gap-28">
      <div className="flex flex-col items-center gap-20 justify-center min-h-screen text-white">
        <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-lg p-8 shadow-2xl border border-white/20">
          <h1 className="pt-12 text-7xl text-white font-bold text-center drop-shadow-lg">
            DecentraLand
          </h1>
          <h2 className="pt-12 text-2xl text-white font-bold text-center drop-shadow-lg2">
            Revolutionizing Land Ownership with Blockchain
          </h2>
          <div className="w-full flex flex-col items-center justify-center text-center py-4 px-6">
            <div
              id="text"
              className="mb-5 text-2xl text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-blue-500 to-purple-600"
              style={{ minHeight: "5em", maxWidth: "27em", padding: "0.5em" }}
            >
              This is a decentralized platform for secure land
              registration and seamless property transactions. Powered by smart
              contracts, it ensures transparency, trust, and efficiency in
              buying, selling, and managing real estate. 
            </div>
            <div className="flex gap-10">
              <NavLink to="/Auth">
                <button className="text-lg bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 text-white px-10 py-5 rounded-full shadow-lg transition-transform transform hover:scale-105">
                  Buy Land
                </button>
              </NavLink>
              <NavLink to="/Auth">
                <button className="text-lg bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 text-white px-10 py-5 rounded-full shadow-lg transition-transform transform hover:scale-105">
                  Resgister Land
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

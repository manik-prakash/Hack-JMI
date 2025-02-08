import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import LandRegister from "./components/LandRegister";
import Chatbot from "./components/Chatbot";
import './App.css';
import Dashboard from "./components/Dashboard";
import NavbarDashboard from "./components/NavbarDashboard";
import Marketplace from "./components/MarketPlace";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: 
      <>
        <Navbar/>
        <Home/>
      </>,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/landregister",
      element: <LandRegister />,
    },
    {
      path: "/dashboard",
      element:
      <>
      <NavbarDashboard />
      <Dashboard />
      </> , 
    },
    {
      path: "/marketplace",
      element:
      <>
      <NavbarDashboard />
      <Marketplace />
      </> , 
    },
    {
      path: "/chat",
      element: <Chatbot />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

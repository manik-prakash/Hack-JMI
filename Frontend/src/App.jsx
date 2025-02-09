//
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import LandRegistrationForm from "./components/LandRegister";
import Chatbot from "./components/Chatbot";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/MarketPlace";
import NotFound from "./components/NotFound";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/landregister",
      element: <LandRegistrationForm />,
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar />
          <Dashboard />
        </>
      ),
    },
    {
      path: "/marketplace",
      element: (
        <>
          <Navbar />
          <Marketplace />
        </>
      ),
    },
    {
      path: "/chat",
      element: (
        <>
          <Navbar />
          <Chatbot />
        </>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

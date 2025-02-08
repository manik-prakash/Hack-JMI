//
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/LogIn";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import LandRegistrationForm from "./components/LandRegister";
import './App.css';

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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/landregister",
      element: <LandRegistrationForm />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

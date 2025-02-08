import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/LogIn";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

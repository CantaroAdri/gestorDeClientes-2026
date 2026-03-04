import { useState } from "react";

import NavBar from "./components/NavBar/navBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from "./page/clientes/clientes";
import Home from "./page/home/home";
import Modulos from "./page/modulos/modulos";
import Carrito from "./page/carrito/carrito";

function App() {
  return (
    <BrowserRouter>
        <NavBar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Modulos" element={<Modulos />} />
        <Route path="/Carrito" element={<Carrito />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

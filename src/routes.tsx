import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Sobre } from "./pages/Sobre";
import { Categorias } from "./pages/Categorias";
import { Usuarios } from "./pages/Usuarios";

export function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre/:id" element={<Sobre />} />
        <Route path="/categorias/:id" element={<Categorias />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

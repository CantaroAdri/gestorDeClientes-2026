import { Link } from "react-router-dom";

const Rutas = () => {
  return (
    <nav style={{ padding: '10px', display: 'flex', gap: '15px' }}>
      {/* Usamos Link en lugar de <a> para no recargar la página */}
      <Link to="/" className="btn btn-outline-primary">Home</Link>
      <Link to="/Clientes" className="btn btn-outline-primary">Clientes</Link>
      <Link to="/Modulos" className="btn btn-outline-primary">Modulos</Link>
      <Link to="/Carrito" className="btn btn-outline-primary">Carrito</Link>
    </nav>
  );
};

export default Rutas;
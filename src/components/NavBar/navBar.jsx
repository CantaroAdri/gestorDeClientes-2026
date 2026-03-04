import { Link } from 'react-router-dom';
import "./nav.css"


const NavBar = () => {
  return (
    <nav id='navBar'>
      <h1 className='titulo'>GESTOR</h1>

      <div id='btn-link'>
      {/* Para ir al Home, usa Link también */}
      <Link to="/"> 
        <button className='btn'>Home</button>
      </Link>
      
      {/* Agrega la barra '/' al principio */}
      <Link to="/Clientes">
        <button className='btn'>Clientes</button>
      </Link>

      <Link to="Modulos">
      <button className='btn'>Modulos</button>
      </Link>

      <Link to="Carrito">
      <button className='btn'>Carrito</button>
      </Link>
      
      </div>
    </nav>
  );
};

export default NavBar;
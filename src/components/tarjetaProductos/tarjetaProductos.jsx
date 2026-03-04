import { useState } from "react";

const TarjetaProducto = ({ prod, agregarAlCarrito }) => {
  // El estado vive AQUÍ, por eso es independiente para cada tarjeta
  const [contadorLocal, setContadorLocal] = useState(0);

  return (
    <div className="card p-3 shadow-sm" style={{ backgroundColor: 'white', color: 'black', minWidth: '180px' }}>
      <strong>{prod.modelo}</strong>
      <strong>{prod.precio}</strong>
      <strong>{prod.Stock}</strong>
      <span>Stock: {prod.cantidad}</span>            
      <small style={{ color: 'gray' }}>{prod.descripcion}</small>
      
      <hr />
      <p className="mb-1 text-center">Cantidad: <strong>{contadorLocal}</strong></p>
      
      <div className="d-flex gap-2 justify-content-center">
        <button 
          onClick={() => setContadorLocal(contadorLocal + 1)} 
          className="btn btn-sm btn-outline-primary"
        >+</button>
        
        <button 
          onClick={() => setContadorLocal(contadorLocal > 0 ? contadorLocal - 1 : 0)} 
          className="btn btn-sm btn-outline-danger"
        >-</button>
      </div>

      <button 
        onClick={() => {
          agregarAlCarrito(prod, contadorLocal);
          setContadorLocal(0); // Opcional: resetear a 0 al agregar
        }} 
        className="btn btn-success btn-sm mt-3"
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default TarjetaProducto
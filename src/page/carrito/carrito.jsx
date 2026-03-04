

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Carrito = () => {
  // 1. Cargamos el estado inicial desde LocalStorage
  const [agregarCarrito, setAgregarCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito_compras");
    return guardado ? JSON.parse(guardado) : [];
  });

  // 2. Escuchamos cambios en el LocalStorage (por si se agrega desde Modulos)
  useEffect(() => {
    const escucharCambios = () => {
      const guardado = localStorage.getItem("carrito_compras");
      if (guardado) {
        setAgregarCarrito(JSON.parse(guardado));
      }
    };

    // Este evento detecta cambios entre componentes/pestañas
    window.addEventListener("storage", escucharCambios);

    // También revisamos cada vez que el componente se monta
    escucharCambios();

    return () => window.removeEventListener("storage", escucharCambios);
  }, []);

  const vaciarCarrito = () => {
    setAgregarCarrito([]);
    localStorage.removeItem("carrito_compras");
  };

  const handleEliminar = (indexAEliminar) => {
    // Filtramos el carrito por su posición (index)
    const nuevoCarrito = agregarCarrito.filter(
      (_, index) => index !== indexAEliminar,
    );

    // Actualizamos estado y LocalStorage
    setAgregarCarrito(nuevoCarrito);
    localStorage.setItem("carrito_compras", JSON.stringify(nuevoCarrito));

    // Notificamos el cambio para que otros componentes se enteren
    window.dispatchEvent(new Event("storage"));

    Swal.fire({
      title: "Eliminado",
      text: "Producto quitado del carrito",
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="container mt-4">
      <h1>Carrito de compras</h1>
      <button onClick={vaciarCarrito} className="btn btn-warning btn-sm mb-3">
        Vaciar Carrito
      </button>

      <div className="p-3 border bg-light shadow-sm">
        <h4>🛒 Productos ({agregarCarrito.length})</h4>
        {agregarCarrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul className="list-group">
            {agregarCarrito.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{item.modelo}</strong> - Cantidad:{" "}
                  {item.cantidadSeleccionada}
                </span>
                <span className="badge bg-primary">{item.descripcion}</span>
                <button
                  onClick={() => handleEliminar(index)}
                  className="btn-guardar"
                  style={{ backgroundColor: "#28a745" }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Carrito;

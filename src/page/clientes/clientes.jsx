import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase"; // Importa tu conexión
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./cliente.css";

const Clientes = () => {
  const navigate = useNavigate();
  const [listaClientes, setListaClientes] = useState([]);
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    modelo: "",
    reparacion: "",
    observacion: "",
    anticipo: "",
    precio: "",
  });

  // --- A. TRAER DATOS DE FIREBASE AL CARGAR ---
  const obtenerClientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clientes"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setListaClientes(docs);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  // --- B. GUARDAR EN FIREBASE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Guardamos en la colección "clientes" de Firebase
      await addDoc(collection(db, "clientes"), cliente);

      // Limpiamos form
      setCliente({ 
        nombre: "", apellido: "", telefono: "", modelo: "", 
        reparacion: "", observacion: "", anticipo: "", precio: "" 
      });
      
      // Refrescamos la lista
      obtenerClientes();
      alert("¡Guardado en la nube!");
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // --- C. BORRAR DE FIREBASE ---
  const eliminarCliente = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminarlo?")) {
      try {
        await deleteDoc(doc(db, "clientes", id));
        obtenerClientes(); // Recargar lista
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  // --- D. RENDERIZADO ---
  return (
    <div className="contenedor-doble">
      {/* COLUMNA IZQUIERDA: FORMULARIO */}
      <div className="panel">
        <h2 className="subtitulo">Registrar Nuevo Cliente</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={cliente.nombre} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Apellido:</label>
            <input type="text" name="apellido" value={cliente.apellido} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input type="number" name="telefono" value={cliente.telefono} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Modelo:</label>
            <input type="text" name="modelo" value={cliente.modelo} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Reparación:</label>
            <input type="text" name="reparacion" value={cliente.reparacion} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Observación:</label>
            <textarea name="observacion" value={cliente.observacion} onChange={handleChange} className="form-control" rows="3" placeholder="Detalles extra ..."></textarea>
          </div>

          <div className="form-group">
            <label>Anticipo:</label>
            <input type="number" name="anticipo" value={cliente.anticipo} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Precio:</label>
            <input type="number" name="precio" value={cliente.precio} onChange={handleChange} className="form-control" />
          </div>

          <button type="submit" className="btn-guardar">Guardar Cliente</button>
        </form>
      </div>

      {/* COLUMNA DERECHA: LISTA DE CLIENTES */}
      <div className="panel panel-lista">
        <h2 className="subtitulo">Clientes Agregados ({listaClientes.length})</h2>

        {listaClientes.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.7 }}>Esperando registros...</p>
        ) : (
          <div className="d-flex flex-column gap-2">
            {listaClientes.map((item) => (
              <div key={item.id} className="card p-3 shadow-sm" style={{ backgroundColor: "white", color: "black", borderRadius: "8px" }}>
                <h5 style={{ margin: "0 0 5px 0", color: "blueviolet" }}>{item.nombre} {item.apellido}</h5>
                <p style={{ margin: 0, fontSize: "0.9em" }}><strong>Modelo:</strong> {item.modelo}</p>
                <p style={{ margin: 0, fontSize: "0.9em" }}><strong>Obs:</strong> {item.observacion}</p>
                <p style={{ margin: 0, fontSize: "0.9em" }}><strong>Repa:</strong> {item.reparacion}</p>
                <p style={{ margin: 0, fontSize: "0.9em" }}><strong>Anticipo:</strong> ${item.anticipo}</p>
                <p style={{ margin: 0, fontSize: "0.9em" }}><strong>Precio:</strong> ${item.precio}</p>
                <button onClick={() => eliminarCliente(item.id)} className="btn-eliminar">Eliminar Registro</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; // <-- Esta es la llave que faltaba cerrar al final

export default Clientes;
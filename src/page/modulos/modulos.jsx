import { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./modulos.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TarjetaProducto from "../../components/tarjetaProductos/tarjetaProductos";
import Carrito from "../carrito/carrito";

const Modulos = () => {
  const [agregarPro, setAgregarPro] = useState([]);
  
  // CORRECCIÓN: Inicializar con lo que haya en LocalStorage
  const [agregarCarrito, setAgregarCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito_compras");
    return guardado ? JSON.parse(guardado) : [];
  });


 // Sincronizar cambios al LocalStorage
  useEffect(() => {
    localStorage.setItem("carrito_compras", JSON.stringify(agregarCarrito));
  }, [agregarCarrito]);

  const agregarAlCarrito = (producto, cantidad) => {
    if (cantidad === 0) return Swal.fire("Atención", "Selecciona al menos una unidad", "info");

    const nuevoItem = {
      ...producto,
      cantidadSeleccionada: cantidad,
    };

    setAgregarCarrito([...agregarCarrito, nuevoItem]);
    
    // Dispatch de evento manual para que Carrito se entere si está en la misma página
    window.dispatchEvent(new Event("storage")); 
    
    Swal.fire("Agregado", `${producto.modelo} se sumó al carrito`, "success");
  };

  // --- TRAER DATOS ---
  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setAgregarPro(docs);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // --- MANEJO DEL FORMULARIO NORMAL ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuardar((prev) => ({ ...prev, [name]: value }));
  };

  // --- FUNCIÓN DEL SWEETALERT (Corregida) ---
  const mostrarFormulario = () => {
    MySwal.fire({
      title: "Agregar Producto Rápido",
      html: `
        <input id="swal-modelo" class="swal2-input" placeholder="Modelo">
        <input id="swal-cantidad" class="swal2-input" placeholder="Cantidad" type="number">
        <input id="swal-descrip" class="swal2-input" placeholder="Descripcion">
        <input id="swal-precio" class="swal2-input" placeholder="Precio">

      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        // Obtenemos los valores de los inputs del alert
        const modelo = document.getElementById("swal-modelo").value;
        const cantidad = document.getElementById("swal-cantidad").value;
        const descripcion = document.getElementById("swal-descrip").value;

        if (!modelo || !cantidad) {
          Swal.showValidationMessage("Por favor completa ambos campos");
        }
        return { modelo, cantidad, descripcion };
      },
    }).then(async (result) => {
      // Si el usuario le dio a Guardar (Confirmed)
      if (result.isConfirmed) {
        try {
          // GUARDAMOS EN FIREBASE
          await addDoc(collection(db, "productos"), {
            modelo: result.value.modelo,
            cantidad: result.value.cantidad,
            descripcion: result.value.descripcion,
            anticipo: 0, // Valor por defecto
          });

          // Refrescamos la lista y mostramos éxito
          obtenerProductos();
          Swal.fire(
            "¡Guardado!",
            "El producto se agregó correctamente.",
            "success",
          );
        } catch (error) {
          Swal.fire("Error", "No se pudo guardar", "error");
        }
      }
    });
  };

  // --- SUBMIT DEL FORMULARIO NORMAL ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "productos"), productos);
      setGuardar({ modelo: "", descripcion: "", cantidad: "", anticipo: "" });
      obtenerProductos();
      Swal.fire("Guardado", "Producto agregado correctamente", "success");
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <>
      <h1>Módulos</h1>

      {/* BOTÓN QUE ABRE EL SWEETALERT */}
      <div style={{ margin: "20px" }}>
        <button
          onClick={mostrarFormulario}
          className="btn-guardar"
          style={{ backgroundColor: "#28a745" }}
        >
          🚀 Agregar producto
        </button>
      </div>

      {/* LISTA DE PRODUCTOS GUARDADOS */}
     
      <h3 className="mt-4">Inventario ({agregarPro.length})</h3>
      <div
        className="lista-productos-firebase"
        style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
      >
        {agregarPro.map((prod) => (
          <TarjetaProducto
            key={prod.id}
            prod={prod}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      
    </>
  );
};

export default Modulos;

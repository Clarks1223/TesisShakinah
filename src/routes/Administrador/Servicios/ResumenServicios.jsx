import React, { useEffect, useState } from "react";
import ListaServicios from "../../../components/ListaServicios/ListaServicios.jsx";
import "../Empleados/Empleados.css";
import { fireStore } from "../../../Auth/firebase.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, Outlet } from "react-router-dom";

export const ResumenServicios = (props) => {
  const [dsp1, setDsp1] = useState(true);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const empleadosRef = collection(fireStore, "Servicios");
      const resp = await getDocs(empleadosRef);
      setEmpleados(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };
    fetchData();
  }, [empleados]);

  const eliminarEmpleado = async (id) => {
    // Eliminar el empleado de Firestore
    try {
      await deleteDoc(doc(fireStore, "Servicios", id));
      // Actualizar el estado para reflejar el cambio en la UI
      setEmpleados((prevEmpleados) => prevEmpleados.filter((e) => e.id !== id));
      console.error("Servicio Eliminado");
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  };

  return (
    <section className="Vista-empleados">
      <section className="titulo">
        <h1>Servicios</h1>
      </section>
      <section className="agregar-empleado">
        <Link
          to={
            dsp1 ? "/Administrador/Servicios/Nuevo" : "/Administrador/Servicios"
          }
        >
          <button onClick={() => setDsp1(!dsp1) }>
            {dsp1 ? "Agregar servicio" : "Lista de servicios"}
          </button>
        </Link>
      </section>
      <section className="Persona">
        {dsp1 ? (
          <section className="lista-empelados">
            <ListaServicios
              empleados={empleados}
              onDelete={eliminarEmpleado}
              pantalla={setDsp1}
            />
          </section>
        ) : (
          <Outlet />
        )}
      </section>
    </section>
  );
};
export default ResumenServicios;

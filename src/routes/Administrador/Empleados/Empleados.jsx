import React, { useEffect, useState } from "react";
import ListaEmpleados from "../../../components/ListaEmpleados/ListaEmpleados.jsx";
import { fireStore } from "../../../Auth/firebase.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, Outlet } from "react-router-dom";
const VerEmpleados = () => {

  const [dsp1, setDsp1] = useState(true);

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const empleadosRef = collection(fireStore, "Personal");
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
    try {
      await deleteDoc(doc(fireStore, "Personal", id));
      setEmpleados((prevEmpleados) => prevEmpleados.filter((e) => e.id !== id));
      console.log("Empleado eliminado");
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
    }
  };

  return (
    <section className="Vista-empleados">
      <section className="titulo">
        <h1>Empleados</h1>
      </section>
      <section className="agregar-empleado">
        <Link
          to={
            dsp1 ? "/Administrador/Personal/Nuevo" : "/Administrador/Personal"
          }
        >
          <button onClick={() => setDsp1(!dsp1)}>
            {dsp1 ? "Nuevo empleado" : "Lista de empleados"}
          </button>
        </Link>
      </section>
      {dsp1 ? (
        <section className="Persona">
          <section className="lista-empelados">
            <ListaEmpleados
              empleados={empleados}
              onDelete={eliminarEmpleado}
              pantalla={setDsp1}
            />
          </section>
        </section>
      ) : (
        <Outlet />
      )}
    </section>
  );
};

export default VerEmpleados;

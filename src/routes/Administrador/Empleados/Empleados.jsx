import React, { useEffect, useState } from "react";
import ListaEmpleados from "../../../components/ListaEmpleados/ListaEmpleados.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";
import { Link } from "react-router-dom";
import AgregarEmpleado from "./Agregar/AgregarEmpleado.jsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore } from "../../../Auth/firebase.js";
const VerEmpleados = () => {
  const { verItems, eliminar, setItemID} = useAuth();

  const [dsp1, setDsp1] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [elim, setElim] = useState(false);

  useEffect(() => {
    verItems("Personal", setEmpleados).then(
      console.log("Empelados recuperados de la base: ", empleados.length)
    );
    setItemID("");
  }, [dsp1, elim]);

  const verificar = async (id, tabla) => {
    try {
      const collectionRef = collection(fireStore, tabla);
      const q = query(collectionRef, where("IDEmpleado", "==", id));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size > 0;
    } catch (error) {
      console.error("Error al verificar citas:", error);
      return true;
    }
  };

  const eliminarEmpleado = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar este empleado?")) {
      try {
        const conflictoCita = await verificar(id, "Citas");
        const conflictoServicio = await verificar(id, "Servicios");
        if (conflictoCita) {
          alert(
            "Actualmente hay citas agendadas para este usuario. Elimine primero dichas citas."
          );
        } else if (conflictoServicio) {
          alert(
            "Actualmente hay servicios vinculados a este empleado. Elimine primero dichos servicios."
          );
        } else {
          await eliminar("Personal", id);
          console.log("Se ha eliminado el empleado correctamente");
          setElim(!elim);
        }
      } catch (error) {
        alert("Ha ocurrido un error", error);
      }
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
        <AgregarEmpleado pantalla={setDsp1} />
      )}
    </section>
  );
};

export default VerEmpleados;

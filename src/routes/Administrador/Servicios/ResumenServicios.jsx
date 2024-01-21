import React, { useEffect, useState } from "react";
import ListaServicios from "../../../components/ListaServicios/ListaServicios.jsx";
import "../Empleados/Empleados.css";
import { Link } from "react-router-dom";
import ActualizarServicio from "./Nuevo/AgregarServicio.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";

import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore } from "../../../Auth/firebase.js";

export const ResumenServicios = (props) => {
  const [dsp1, setDsp1] = useState(true);
  const [items, setItems] = useState([]);
  const [elim, setElim] = useState(false);
  const { verItems, eliminar, setItemID } = useAuth();

  useEffect(() => {
    verItems("Servicios", setItems);
    setItemID("");
  }, [dsp1, elim]);

  const verificar = async (id, tabla) => {
    try {
      const collectionRef = collection(fireStore, tabla);
      const q = query(collectionRef, where("IDservicio", "==", id));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size > 0;
    } catch (error) {
      console.error("Error al verificar citas:", error);
      return true;
    }
  };
  const eliminarServicio = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar este servicio?")) {
      try {
        const conflictoCita = await verificar(id, "Citas");
        if (conflictoCita) {
          alert(
            "Actualmente hay citas agendadas para este servicio. Elimine primero dichas citas."
          );
        } else {
          await eliminar("Servicios", id);
          console.log("Se ha eliminado el servicio");
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
        <h1>Servicios</h1>
      </section>
      <section className="agregar-empleado">
        <Link
          to={
            dsp1 ? "/Administrador/Servicios/Nuevo" : "/Administrador/Servicios"
          }
        >
          <button onClick={() => setDsp1(!dsp1)}>
            {dsp1 ? "Agregar servicio" : "Lista de servicios"}
          </button>
        </Link>
      </section>

      <section className="Persona">
        {dsp1 ? (
          <section className="lista-empelados">
            {items.length < 1 ? (
              "Aun no se han registrado servicios"
            ) : (
              <ListaServicios
                items={items}
                onDelete={eliminarServicio}
                pantalla={setDsp1}
              />
            )}
          </section>
        ) : (
          <ActualizarServicio pantalla={setDsp1} />
        )}
      </section>
    </section>
  );
};
export default ResumenServicios;

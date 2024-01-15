import React, { useEffect, useState } from "react";
import ListaServicios from "../../../components/ListaServicios/ListaServicios.jsx";
import "../Empleados/Empleados.css";
import { Link, Outlet } from "react-router-dom";
import ActualizarServicio from "./Nuevo/AgregarServicio.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";

export const ResumenServicios = (props) => {
  const [dsp1, setDsp1] = useState(true);
  const [items, setItems] = useState([]);
  const [elim, setElim] = useState(false);
  //funciones para manejar los datos de la base
  const { verItems, eliminar, itemID, setItemID, historialCitas } = useAuth();
  const [citas, setCitas] = useState([]);
  let cont = 0;
  useEffect(() => {
    verItems("Servicios", setItems);
    setItemID("");
  }, [dsp1, elim]);

  useEffect(() => {
    historialCitas("Citas", "IDservicio", setCitas, itemID);
    console.log("Se ha ejecutado este codigo: ", (cont = cont + 1));
    setDsp1(true);
  }, []);

  const eliminarServicio = async (id) => {
    if (window.confirm("¿Esta seguro de elinminar este item?")) {
      try {
        //const existenCitas = citas.length > 0;
        const existenCitas = citas.some((cita) => cita.IDservicio === id);
        if (existenCitas) {
          alert(
            "Actualmente existen citas agendadas con este servicio, primero elimine las citas"
          );
        } else {
          console.log("se ha eliminado, ya que citas contiene: ", citas.length);
          eliminar("Servicios", id);
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

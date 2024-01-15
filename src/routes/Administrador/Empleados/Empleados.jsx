import React, { useEffect, useState } from "react";
import ListaEmpleados from "../../../components/ListaEmpleados/ListaEmpleados.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";
import { Link, Outlet } from "react-router-dom";
import AgregarEmpleado from "./Agregar/AgregarEmpleado.jsx";
const VerEmpleados = () => {
  const { verItems, eliminar, setItemID, itemID, historialCitas } = useAuth();

  const [dsp1, setDsp1] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [citas, setCitas] = useState([]);
  const [elim, setElim] = useState(false);

  useEffect(() => {
    verItems("Personal", setEmpleados);
    setItemID("");
  }, [dsp1, elim]);

  useEffect(() => {
    console.log("itemID", citas);
    historialCitas("Citas", "IDEmpleado", setCitas, itemID);
  }, []);

  const eliminarEmpleado = async (id) => {
    if (window.confirm("¿Esta seguro de elinminar este empleado?")) {
      try {
        const existenCitas = citas.some((cita) => cita.IDEmpleado === id);
        if (existenCitas) {
          alert(
            "Actualmente existen citas agendadas para este usuario, primero elimine las citas"
          );
        } else {
          console.log("se ha eliminado, ya que citas contiene: ", citas);
          //Falta elimnar datos de inicio de sesion de usaurio
          eliminar("Personal", id);
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

import "./ListaEmpleados.css";
import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const ListaEmpleados = ({ empleados, onDelete, pantalla }) => {
  const { setItemID } = useAuth();
  return (
    <>
      {empleados.map((empleado) => (
        <section className="Persona" key={empleado.id}>
          <section className="descripcion">
            <p>{empleado.Nombre ? empleado.Nombre : empleado.Titulo}</p>
          </section>
          <section className="imagen">
            <img src={empleado.Foto} alt="Empleado" />
          </section>
          <section className="descripcion">
            <p>{empleado.Cargo ? empleado.Cargo : `${empleado.Costo}$`}</p>
            <p>{empleado.Empleado}</p>
          </section>
          <section className="botones">
            <Link to="/Administrador/Personal/Nuevo">
              <button
                className="modificar"
                onClick={() => {
                  setItemID(empleado.id);
                  pantalla(false);
                }}
              >
                Modificar
              </button>
            </Link>

            <button className="eliminar" onClick={() => onDelete(empleado.id)}>
              Eliminar
            </button>
          </section>
        </section>
      ))}
    </>
  );
};

export default ListaEmpleados;

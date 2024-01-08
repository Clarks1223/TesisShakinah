import "./ListaEmpleados.css";
import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const ListaServicios = ({ items, onDelete, pantalla }) => {
  const { setItemID } = useAuth();
  return (
    <>
      {items.map((item) => (
        <section className="Persona" key={item.id}>
          <section className="descripcion">
            <p>{item.Nombre ? item.Nombre : item.Titulo}</p>
          </section>
          <section className="imagen">
            <img src={item.Foto} alt="Empleado" />
          </section>
          <section className="descripcion">
            <p>{item.Cargo ? item.Cargo : `${item.Costo}$`}</p>
            <p>{item.Empleado}</p>
          </section>
          <section className="botones">
            <Link to="/Administrador/Servicios/Nuevo">
              <button
                className="modificar"
                onClick={() => {
                  setItemID(item.id);
                  pantalla(false);
                }}
              >
                Modificar
              </button>
            </Link>

            <button className="eliminar" onClick={() => onDelete(item.id)}>
              Eliminar
            </button>
          </section>
        </section>
      ))}
    </>
  );
};

export default ListaServicios;

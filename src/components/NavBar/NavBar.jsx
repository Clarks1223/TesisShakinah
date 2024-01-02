import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <>
      <section className="menuPrincipal">
        <Link to="/">
          <button className="button-NavBar">Shakinah</button>
        </Link>
        <Link to="/Nosotros">
          <button className="button-NavBar">Nosotros</button>
        </Link>
        <Link to="/Contactos">
          <button className="button-NavBar">Contactos</button>
        </Link>
        <Link to="/Servicios">
          <button className="button-NavBar">Servicios</button>
        </Link>
        <Link to="/Login">
          <button className="mi-cuenta">Mi cuenta</button>
        </Link>
      </section>
    </>
  );
};
export default Menu;

import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fireBaseApp } from "../../Auth/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(fireBaseApp);
const Menu = () => {
  const navigate = useNavigate();

  const miCuenta = async () => {
    if (!(auth.currentUser === null) && !(auth.currentUser.email === null)) {
      if (auth.currentUser.email === "shakinah.imagen.estetica@gmail.com") {
        navigate("/Administrador");
      } else {
        navigate("/Usuario");
      }
    } else {
      navigate("/Login");
    }
  };
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
        <button className="mi-cuenta" onClick={miCuenta}>
          Mi cuenta
        </button>
      </section>
    </>
  );
};
export default Menu;

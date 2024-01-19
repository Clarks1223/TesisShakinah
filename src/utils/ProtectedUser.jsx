import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { fireBaseApp } from "../Auth/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(fireBaseApp);

const ProtectedUser = ({ verRol, redirectPath = "/Login" }) => {
  const { userInformation } = useAuth();

  if (!auth.currentUser) {
    alert("Debe iniciar sesion");
    return <Navigate to={redirectPath} replace />;
  }
  if (auth.currentUser.emailVerified === false) {
    alert("Verifique su cuenta de correo");
    return <Navigate to={redirectPath} replace />;
  }
  if (verRol !== userInformation.Rol) {
    console.log("el tipo de usuario que ha llegado: ", userInformation.Rol);
    alert("No tiene acceso a esta ruta");
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedUser;

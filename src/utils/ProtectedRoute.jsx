import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { fireBaseApp } from "../Auth/firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth(fireBaseApp);

const ProtectedRoute = ({ redirectPath = "/Login" }) => {
  const { user, userInformation } = useAuth(); // Obtén el usuario desde el contexto
  const [mailVerified, setMailVerified] = useState(
    auth.currentUser?.emailVerified
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (auth.currentUser) {
        const updatedUser = await auth.currentUser.reload();
        setMailVerified(updatedUser.emailVerified);
      }
    };

    checkEmailVerification();

    return () => {
      // Limpiar efecto al desmontar el componente si es necesario
    };
  }, [auth.currentUser]);
  if (!user) {
    // Si no hay usuario, redirige al path de inicio de sesión
    return <Navigate to={redirectPath} replace />;
  }

  if (mailVerified === false) {
    alert("Verifique su cuenta de correo");
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

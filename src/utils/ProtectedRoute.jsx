import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { fireBaseApp } from "../Auth/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth(fireBaseApp);

const ProtectedRoute = ({ redirectPath = "/Login" }) => {
  const [user, setUser] = useState(null);
  const [mailVerified, setMailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        const checkEmailVerification = async () => {
          const updatedUser = await auth.currentUser.reload();
          setMailVerified(updatedUser.emailVerified);
        };

        checkEmailVerification();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    // No hay usuario autenticado, redirige al login
    return <Navigate to={redirectPath} replace />;
  }

  if (mailVerified === false) {
    // El correo no ha sido verificado, alerta y redirige
    alert("Verifique su cuenta de correo");
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

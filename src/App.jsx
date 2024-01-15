//Estilo general
import "./App.css";
//Componentes permanentes
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
//Rutas Publicas
import Shakinah from "./routes/Home/Shakinah/home";
import Nosotros from "./routes/Home/Nosotros/Nosotros";
import Contactos from "./routes/Home/Contactos/Contactos";
import Servicios from "./routes/Home/Servicios/Servicios";
import Registrar from "./routes/Registrar/Registrar";
import Login from "./routes/Login/Login";
import PasswordRecovery from "./routes/RecuperarContrasenia/Password-Recovery";
//Proteger Rutas
import ProtectedRoute from "./utils/ProtectedRoute";
//Rutas Privadas Administrador
import Administrador from "./routes/Administrador/Dashboard/Administrador";
import VerEmpleados from "./routes/Administrador/Empleados/Empleados";
import AgregarEmpleado from "./routes/Administrador/Empleados/Agregar/AgregarEmpleado";
import AgregarServicio from "./routes/Administrador/Servicios/Nuevo/AgregarServicio";
import ActualizarServicio from "./routes/Administrador/Servicios/Actualizar/ActualizarServicio";
import ResumenCitas from "./routes/Administrador/ResumenCitas/ResumenCitas";
import ResumenServicios from "./routes/Administrador/Servicios/ResumenServicios";

//Rutas generales
import Password from "./components/Password/Password";
import ErrorRoute from "./routes/Error/Error";
//Rutas privadas cliente
import Usuario from "./routes/Usuario/Dashboard/Usuario";
import ListarCitas from "./routes/Usuario/Citas/AgendarCitas";
import VerCitas from "./routes/Usuario/CitasAgendadas/CitasAgendadas";
import EditarPerfil from "./routes/Usuario/EditarPerfil/Perfil";
//React router
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Context
import { AuthProvider } from "./Context/AuthContext";
import { CitaProvider } from "./Context/CitaContext";

function App() {
  return (
    <BrowserRouter>
      <section className="menu">
        <NavBar />
      </section>

      <section className="main">
        <AuthProvider>
          <CitaProvider>
            <Routes>
              <Route path="/" element={<Shakinah />} />
              <Route path="/Nosotros" element={<Nosotros />} />
              <Route path="/Contactos" element={<Contactos />} />
              <Route path="/Servicios" element={<Servicios />} />
              <Route path="/Registrar" element={<Registrar />} />
              <Route path="/Login" element={<Login />} />
              <Route
                path="/Recuperar-Contrasenia"
                element={<PasswordRecovery />}
              />

              <Route element={<ProtectedRoute />}>
                <Route path="/Administrador/" element={<Administrador />}>
                  <Route path="Personal/" element={<VerEmpleados />}>
                    <Route path="Nuevo" element={<AgregarEmpleado />} />
                    
                  </Route>
                  <Route path="Citas" element={<ResumenCitas />} />
                  <Route path="Servicios/" element={<ResumenServicios />}>

                    <Route path="Nuevo" element={<AgregarServicio />} />
                    

                  </Route>
                  <Route path="Password" element={<Password />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/Usuario/" element={<Usuario />}>
                  <Route path="Agendar" element={<ListarCitas />} />
                  <Route path="VerCitas" element={<VerCitas />} />
                  <Route path="Perfil" element={<EditarPerfil />} />
                  <Route path="Password" element={<Password />} />
                </Route>
                <Route path="*" element={<ErrorRoute />} />
              </Route>
            </Routes>
          </CitaProvider>
        </AuthProvider>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </BrowserRouter>
  );
}

export default App;

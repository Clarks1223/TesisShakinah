import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css";

export const Login = () => {
  const { signIn, user, userId } = useAuth();
  const navigate = useNavigate();
  const idAdmin = "8zmzwVK0ZUNxACmsUzqLDl5pz2B2";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.contrasenia);
      if (user) {
        userId === idAdmin ? navigate("/Administrador") : navigate("/Usuario");
      } else {
        alert("Verifique sus credenciales");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error.message);
      alert("Verifique sus credencialess");
      // Puedes manejar el error aquí si es necesario
    }
  };
  return (
    <div className="login-container">
      <header className="tituloForm">
        <h1>Iniciar sesión</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-login-correo">
          <label>Correo electronico:</label>
          {errors.email?.type === "required" && (
            <p className="error-message">El campo es requerido</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            maxLength={40}
            autoComplete="username"
          />
        </div>

        <div className="form-login-password">
          <label>Contraseña:</label>
          {errors.contrasenia?.type === "required" && (
            <p className="error-message">El campo es requerido</p>
          )}
          <input
            type="password"
            {...register("contrasenia", { required: true })}
            maxLength={20}
            autoComplete="current-password"
          />
        </div>

        <input className="botonEnviar" type="submit" value={"Iniciar Sesión"} />
      </form>

      <section className="form-login-ingresar">
        <p>
          ¿Nuevo en Shakinah? Regístrate
          <Link to="/Registrar"> Aqui</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;

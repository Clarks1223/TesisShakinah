import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css";

export const Login = () => {
  
  const { signIn } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();



  const onSubmit = (data) => {
    signIn(data.email, data.contrasenia);
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
            <p className="error-message">Ingrese su correo electronico</p>
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
            <p className="error-message">Ingrese sus contraseña</p>
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
          ¿Olvidaste tu contraseña? haz click
          <Link to="/Recuperar-Contrasenia"> Aqui</Link>
        </p>
        <p>
          ¿Nuevo en Shakinah? Regístrate
          <Link to="/Registrar"> Aqui</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;

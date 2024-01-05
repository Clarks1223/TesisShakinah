import "./ResumenCitas.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";

const ResumenCitas = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});
  const nombre = "Paula";
  const numero = "26";
  const { personal } = useAuth();
  return (
    <section className="resumen-citas">
      <section className="titulo">
        <h1>Resumen citas</h1>
      </section>
      <section className="top-citas">
        <h2>Top citas</h2>
        <h3>
          El empleado con mayor numero de citas este mes es {`${nombre}`} con 
          {` ${numero}`} citas hasta hoy
        </h3>
      </section>
      <form className="buscador-empleado">
        <h3>Seleccione el empleado para mostrar un resumen</h3>
        <select
          className="default-select"
          {...register("Empleado", { required: true })}
        >
          <option value="" disabled hidden>
            Seleccionar empleado
          </option>
          {personal.map((empleado) => (
            <option
              key={empleado.id}
              value={`${empleado.Nombre} ${empleado.Apellido}`}
            >
              {`${empleado.Nombre} ${empleado.Apellido}`}
            </option>
          ))}
        </select>
        <section className="boton-enviar-contenedor">
          <input type="submit" value={"buscar"}></input>
        </section>
      </form>

      <section className="resumen"></section>
    </section>
  );
};
export default ResumenCitas;

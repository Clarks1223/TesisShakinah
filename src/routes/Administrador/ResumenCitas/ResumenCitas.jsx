import "./ResumenCitas.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { useState, useEffect } from "react";
import ResumenCitaItem from "../../../components/ResumenCitaItem/ResumenCita";

const ResumenCitas = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const [empleado, setEmpleado] = useState();
  const nombre = "Paula";
  const numero = "26";
  const { personal, historialCitas } = useAuth();

  const [citas, setCitas] = useState([]);
  useEffect(() => {
    historialCitas("Citas", "IDEmpleado", setCitas, empleado);
    console.log("datos de empleado al inicio");
  }, [empleado]);

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

      <div className="buscador-empleado">
        <select
          className="default-select"
          {...register("Empleado", { required: true })}
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          defaultValue="" // Establecer el valor predeterminado como vacío
        >
          <option value="" disabled hidden>
            Seleccionar empleado
          </option>
          {personal.map((empleado) => (
            <option key={empleado.id} value={`${empleado.id}`}>
              {`${empleado.Nombre} ${empleado.Apellido}`}
            </option>
          ))}
        </select>
      </div>
      <section className="Persona">
        {citas.length === 0 ? (
          <p>Aun no hay citas agendadas</p>
        ) : (
          <section className="lista-empelados">
            {citas.map((cita) => (
              <ResumenCitaItem
                key={cita.id}
                titulo={cita.Titulo}
                fecha={cita.Fecha}
                hora={cita.Hora}
                personal={cita.Empleado}
                costo={cita.Precio}
                estado={cita.Estado}
                iditem={cita.id}
              />
            ))}
          </section>
        )}
      </section>
    </section>
  );
};
export default ResumenCitas;

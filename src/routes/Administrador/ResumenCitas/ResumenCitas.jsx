import "./ResumenCitas.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { useState, useEffect } from "react";
import ResumenCitaItem from "../../../components/ResumenCitaItem/ResumenCita";

const ResumenCitas = () => {
  const { register } = useForm({});
  const { personal, historialCitas } = useAuth();

  const [empleado, setEmpleado] = useState();
  const [itemEliminado, setitemEliminado] = useState(false);
  const [top, setTop] = useState(true);

  const [citas, setCitas] = useState([]);

  useEffect(() => {
    historialCitas("Citas", "IDEmpleado", setCitas, empleado);
  }, [empleado, itemEliminado]);

  return (
    <section className="resumen-citas">
      <section className="titulo">
        <h1>Resumen citas</h1>
      </section>
      <section className="top-citas">
        <h2>Top citas</h2>
        {top == true ? (
          <h3>
            Se han registrado un total de {citas.length} citas entre todos los
            empleados hasta el dia de hoy
          </h3>
        ) : (
          <h3>
            Este empleado registra un total de {citas.length} citas hasta el dia
            de hoy
          </h3>
        )}
      </section>

      <div className="buscador-empleado">
        <select
          className="default-select"
          {...register("Empleado", { required: true })}
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          defaultValue="" // Establecer el valor predeterminado como vacío
          onChangeCapture={() => {
            setTop(false);
          }}
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
                itemEliminado={itemEliminado}
                detectarEliminado={setitemEliminado}
                usuario="Administrador"
              />
            ))}
          </section>
        )}
      </section>
    </section>
  );
};
export default ResumenCitas;

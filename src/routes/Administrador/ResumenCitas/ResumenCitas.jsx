import "./ResumenCitas.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { useState, useEffect } from "react";
import ResumenCitaItem from "../../../components/ResumenCitaItem/ResumenCita";

const ResumenCitas = () => {
  const { register } = useForm({});
  const { personal, historialCitas, eliminar, actualizarDatos } = useAuth();

  const [empleado, setEmpleado] = useState();
  const [citas, setCitas] = useState([]);
  const [top, setTop] = useState(true);

  const eliminarCitas = async (estado, iditem, setEstadoLocal) => {
    const confirmacion = window.confirm(
      `¿Está seguro de ${
        estado === "Activo" ? "cancelar" : "eliminar"
      } esta cita? No podrá revertir esta acción.`
    );
    console.log("los datos que llegan: ", estado, " y ", iditem);
    console.log("el estado de confirmacion: ", confirmacion);
    if (confirmacion) {
      if (estado === "Activo") {
        console.log("voy a actualizar");
        setEstadoLocal("Cancelado");
        await actualizarDatos("Citas", { Estado: "Cancelado" }, iditem);
      } else if (estado === "Cancelado") {
        console.log("Voy a eliminar");
        const nuevasCitas = citas.filter((cita) => cita.id !== iditem);
        await eliminar("Citas", iditem);
        setCitas(nuevasCitas);
      }
    }
  };

  useEffect(() => {
    historialCitas("Citas", "IDEmpleado", setCitas, empleado);
  }, [empleado]);

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
            empleados hasta el dia de hoy.
          </h3>
        ) : (
          <h3>Este empleado registra un total de {citas.length} citas.</h3>
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
                onDelete={eliminarCitas}
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

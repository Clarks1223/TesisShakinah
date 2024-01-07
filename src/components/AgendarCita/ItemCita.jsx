import React from "react";
import "./ItemCita.css";
import { useCita } from "../../Context/CitaContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";

const ItemCita = (props) => {
  const { userId } = useAuth();
  const { eliminarCita, agendarCitaBase } = useCita();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const fechaFormateada = today.toLocaleDateString("es-ES", options);
    return fechaFormateada;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const onSubmit = (data) => {
    data.Empleado = props.nombreEmpleado;
    data.IDEmpleado = props.EmpleadoID;
    data.IDUsuario = userId;
    data.IDservicio = props.id;
    data.Foto = props.foto;
    data.Titulo = props.titulo;
    data.Precio = props.precio;
    data.Estado = "Activo";
    agendarCitaBase(data, props.id);
  };

  return (
    <section className="contendor-agendar-cita">
      <div className="nombre-empleado">
        <h3>{props.nombreEmpleado}</h3>
      </div>
      <div className="agendar-cita-imagen">
        <img src={props.foto} alt={props.nombreEmpleado} />
      </div>

      <div className="agendar-cita-detalle">
        <h2>{props.titulo}</h2>
        <h2>{`${props.precio}$`}</h2>
      </div>

      <form className="agendar-cita-datos" onSubmit={handleSubmit(onSubmit)}>
        <div className="select-dia">
          <label>Fecha:</label>
          <input
            type="date"
            {...register("Fecha", { required: true })}
            min={getCurrentDate()}
          />
          {errors.Fecha && (
            <span className="error-message">Campo obligatorio</span>
          )}
        </div>
        <div className="select-hora">
          <label>Hora:</label>
          <input
            type="time"
            {...register("Hora", {
              required: true,
              validate: (value) => {
                const selectedTime = new Date(`1970-01-01T${value}`);
                return (
                  selectedTime >= new Date(`1970-01-01T08:00`) &&
                  selectedTime <= new Date(`1970-01-01T17:00`)
                );
              },
            })}
          />
          {errors.Hora && (
            <span className="error-message">
              Selecciona una hora entre las 8 am y las 5 pm
            </span>
          )}
        </div>
        <button type="submit" className="agendar-cita-boton">
          Agendar
        </button>
      </form>

      <div>
        <button
          className="eliminar-cita-boton"
          onClick={() => eliminarCita(props.id)}
        >
          Eliminar
        </button>
      </div>
    </section>
  );
};

export default ItemCita;

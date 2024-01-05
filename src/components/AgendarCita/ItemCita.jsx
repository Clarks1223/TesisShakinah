import React from "react";
import "./ItemCita.css";
import { useCita } from "../../Context/CitaContext";
import { useForm } from "react-hook-form";
import { fireStore } from "../../Auth/firebase";
import { collection, addDoc } from "firebase/firestore";

const ItemCita = (props) => {
  const { eliminarCita } = useCita();
  const lol = "222222222";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };
  const onSubmit = async (data) => {
    try {
      data.Empleado = props.nombreEmpleado;
      data.Foto = props.foto;
      data.Titulo = props.titulo;
      data.Precio = props.precio;
      data.Estado = "Activo";
      await addDoc(collection(fireStore, `Citas-${lol}`), data);
      alert("Se ha agregado una cita: ");
    } catch (error) {
      console.log(error);
      alert("Algo salio mal");
    }
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
          {errors.fecha && (
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
          {errors.hora && (
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

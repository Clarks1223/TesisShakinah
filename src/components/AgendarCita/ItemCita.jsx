import React, { useState } from "react";
import "./ItemCita.css";
import { useCita } from "../../Context/CitaContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore } from "../../Auth/firebase";

const ItemCita = ({ nombreEmpleado, EmpleadoID, foto, titulo, precio, id }) => {
  const { userId, verItem } = useAuth();
  const { eliminarCita, agendarCitaBase } = useCita();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateHourOptions = () => {
    const startHour = 8;
    const endHour = 17;
    const minutesInterval = 30;
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += minutesInterval) {
        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(minute).padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  };

  const [disabledDays, setDisabledDays] = useState([6]);

  const verificarCitasHora = async (idEmpleado, fecha, hora, estado) => {
    try {
      const collectionRef = collection(fireStore, "Citas");
      const q = query(
        collectionRef,
        where("IDEmpleado", "==", idEmpleado),
        where("Fecha", "==", fecha),
        where("Hora", "==", hora),
        where("Estado", "==", estado)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size > 0;
    } catch (error) {
      console.error("Error al verificar citas:", error);
      return true;
    }
  };
  const empleadoHorario = async (id) => {
    try {
      const usuario = await verItem("Personal", id);
      console.log("Se ha recuperado este usuario:", usuario.dias_no_laborables);
      setDisabledDays(usuario.dias_no_laborables);
    } catch (error) {
      console.error("Error al recuperar el usuario:", error);
    }
  };

  const generarMensajeDiasDeshabilitados = (diasDeshabilitados) => {
    const diasSemana = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    return `El empleado ha deshabilitado los día${
      diasDeshabilitados.length > 1 ? "s" : ""
    } ${diasDeshabilitados.map((dia) => diasSemana[dia]).join(" y ")}`;
  };

  const onSubmit = async (data) => {
    data.Empleado = nombreEmpleado;
    data.IDEmpleado = EmpleadoID;
    data.IDUsuario = userId;
    data.IDservicio = id;
    data.Foto = foto;
    data.Titulo = titulo;
    data.Precio = precio;
    data.Estado = "Activo";

    const fechaSeleccionada = new Date(data.Fecha);
    const diaSeleccionado = fechaSeleccionada.getDay();

    await empleadoHorario(EmpleadoID);
    console.log("Se ha actualizado los días no laborables", disabledDays);

    if (disabledDays.includes(diaSeleccionado)) {
      const mensajeDiasDeshabilitados =
        generarMensajeDiasDeshabilitados(disabledDays);
      alert(mensajeDiasDeshabilitados);
      return;
    }

    const hayConflicto = await verificarCitasHora(
      EmpleadoID,
      data.Fecha,
      data.Hora,
      "Activo"
    );

    if (!hayConflicto) {
      console.log("Listo para agendar cita");
      console.log("data: ", data);
      agendarCitaBase(data, id);
    } else {
      alert(
        "Este empleado ya cuenta con una cita en este horario, selecciona otro horario."
      );
      console.log("Existe un conflicto de horario, selecciona otro horario.");
    }
  };

  return (
    <section className="contendor-agendar-cita">
      <div className="nombre-empleado">
        <h3>{nombreEmpleado}</h3>
      </div>
      <div className="agendar-cita-imagen">
        <img src={foto} alt={nombreEmpleado} />
      </div>

      <div className="agendar-cita-detalle">
        <h2>{titulo}</h2>
        <h2>{`${precio}$`}</h2>
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
          <select {...register("Hora", { required: true })}>
            {generateHourOptions()}
          </select>
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
          onClick={() => eliminarCita(id)}
        >
          Eliminar
        </button>
      </div>
    </section>
  );
};

export default ItemCita;

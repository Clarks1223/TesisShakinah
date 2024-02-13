import React, { useEffect, useState } from "react";
import "./ItemCita.css";
import { useCita } from "../../Context/CitaContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireStore } from "../../Auth/firebase";

const ItemCita = ({ nombreEmpleado, EmpleadoID, foto, titulo, precio, id }) => {
  const { userId, verItem, sendCustomEmail } = useAuth();
  const { eliminarCita, agendarCitaBase } = useCita();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    empleadoHorario(EmpleadoID);
  }, []);

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
  const [correo, setCorreo] = useState("");

  const verificarCitasHora = async (idEmpleado, fecha, hora, estado) => {
    let fechaActual = new Date();
    let mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    let hoy = `${fechaActual.getFullYear()}-${mes}-${fechaActual.getDate()}`;
    let horaActual = fechaActual.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    let validator = false;
    console.log("fecha recibida", hoy);
    console.log("fecha objeto", fecha);
    if (fecha === hoy) {
      console.log("Verificar hora");
      if (hora < horaActual) {
        console.log("No se debe agendar la cita");
        alert("Verifique la hora de la cita");
        return null;
      } else {
        validator = true;
        console.log("No hay conflicto de fecha ni hora");
      }
    } else {
      validator = true;
    }
    if (validator) {
      console.log("Se agendara la cita");
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
    }
  };
  const empleadoHorario = async (id) => {
    try {
      const usuario = await verItem("Personal", id);
      console.log("Se ha recuperado este usuario:", usuario.dias_no_laborables);
      setDisabledDays(usuario.dias_no_laborables);
      setCorreo(usuario.Email);
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
    if (hayConflicto == false) {
      agendarCitaBase(data, id);
      const body = `Saludos, se ha agendado una nueva cita:\nServicio: ${data.Titulo}\nFecha: ${data.Fecha}\nHora: ${data.Hora}`;
      const asunto = "Nueva cita";
      sendCustomEmail(body, correo, asunto);
    } else if (hayConflicto == true) {
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
        <h3>{`${titulo} ${precio}$`}</h3>
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

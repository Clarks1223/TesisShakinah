import ResumenCitaItem from "../../../components/ResumenCitaItem/ResumenCita";
import { useState, useEffect } from "react";
import "./CitasAgendadas.css";
import { fireStore } from "../../../Auth/firebase";
import { collection, getDocs } from "firebase/firestore";

export const VerCitas = () => {
  const [citas, setCitas] = useState([]);
  const lol = "11111";
  const fetchData = async () => {
    const collectionCitas = collection(fireStore, `Citas-${lol}`);
    const resp = await getDocs(collectionCitas);

    const serviciosData = resp.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCitas(serviciosData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="titulo">
        <h1>Ver Citas</h1>
      </section>
      <section className="Persona">
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
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default VerCitas;

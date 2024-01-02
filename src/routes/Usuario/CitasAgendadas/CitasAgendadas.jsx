import ResumenCitaItem from "../../../components/ResumenCitaItem/ResumenCita";
import "./CitasAgendadas.css";
export const VerCitas = () => {
  return (
    <>
      <section className="titulo">
        <h1>Ver Citas</h1>
      </section>
      <section className="Persona">
        <section className="lista-empelados">
          <ResumenCitaItem
            titulo="Corte de cabello"
            fecha="12-06-1998"
            hora="14:00"
            personal="Gloria"
            costo="7"
            estado="Finalizada"
          />
          <ResumenCitaItem
            titulo="Corte de cabello"
            fecha="12-06-1998"
            hora="14:00"
            personal="Gloria"
            costo="7"
            estado="Finalizada"
          />
          <ResumenCitaItem
            titulo="Corte de cabello"
            fecha="12-06-1998"
            hora="14:00"
            personal="Gloria"
            costo="7"
            estado="Finalizada"
          />
        </section>
      </section>
    </>
  );
};
export default VerCitas;

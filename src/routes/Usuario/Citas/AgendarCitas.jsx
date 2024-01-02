import ItemCita from "../../../components/AgendarCita/ItemCita";

export const ListarCitas = () => {
  return (
    <>
    <section className="titulo">
      <h1>Agendar citas</h1>
      </section>
      <section className="Persona">
        <section className="lista-empelados">
        <ItemCita
        titulo="Cepillado"
        precio="15"
        />
        <ItemCita
        titulo="Cepillado"
        precio="15"
        />
        <ItemCita
        titulo="Cepillado"
        precio="15"
        />
        
        </section>
      </section>
    </>
  );
};
export default ListarCitas;

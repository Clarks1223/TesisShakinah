import { ServiciosComponent } from "../../../components/Home/ServiciosComponent/ServiciosComponent";
export const Servicios = () => {
  return (
    <>
      <section>
        <h1>Servicios Shakinah</h1>
        <ServiciosComponent
        nombreEmpleado ="Paula"
        />
        <ServiciosComponent
        nombreEmpleado = "Gloria"
        />
      </section>
      <ServiciosComponent
        nombreEmpleado = "Gloria"
        />
    </>
  );
};
export default Servicios;
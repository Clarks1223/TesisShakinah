import { ServiciosComponent } from "../../../components/Home/ServiciosComponent/ServiciosComponent";
import "./Servicios.css";
import { useAuth } from "../../../Context/AuthContext";

export const Servicios = () => {
  const { personal } = useAuth();

  return (
    <>
      <section>
        <h1 className="tituloP">Servicios Shakinah</h1>
        {personal.map((empleado) => (
          <>
            <ServiciosComponent
              key={empleado.id}
              nombreEmpleado={`${empleado.Nombre} ${empleado.Apellido}`}
              EmpleadoID={empleado.id}
            />
          </>
        ))}
      </section>
    </>
  );
};
export default Servicios;

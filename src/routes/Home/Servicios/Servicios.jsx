import { ServiciosComponent } from "../../../components/Home/ServiciosComponent/ServiciosComponent";
import "./servicios.css";
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
            <p>El ide de empleado que se enviara es: {empleado.id}</p>
          </>
        ))}
      </section>
    </>
  );
};
export default Servicios;

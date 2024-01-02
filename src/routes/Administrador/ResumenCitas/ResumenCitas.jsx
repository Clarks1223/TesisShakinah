import "./ResumenCitas.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import data from "../../../MOCK_DATA.json";

const nombre = "Paula Uchuari";
const numero = 88;

//{"id":3,"Nombre":"Ginnie","Aperllido":"Franzini","Fecha":"3/6/2023","hora":"6:54 PM","Servicio":"Chevrolet"},
const ResumenCitas = () => {
  const columns = [
    {
      header: "ID",
      accesorkey: "id",
    },
    {
      header: "Nombre",
      accesorkey: "Nombre",
    },
    {
      header: "Apellido",
      accesorkey: "Aperllido",
    },
    {
      header: "Fecha",
      accesorkey: "Fecha",
    },
    {
      header: "Hora",
      accesorkey: "hora",
    },
    {
      header: "Servicio",
      accesorkey: "Servicio",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="resumen-citas">
      <section className="titulo">
        <h1>Resumen citas</h1>
      </section>
      <section className="top-citas">
        <h2>Top citas</h2>
        <h3>
          El empleado con mayor numero de citas este mes es {`${nombre}`} con{" "}
          {`${numero}`} citas hasta hoy
        </h3>
      </section>
      <form className="buscador-empleado">
        <h3>Seleccione el empleado para mostrar un resumen</h3>
        <select>
          <option>Carlos</option>
          <option>Jose</option>
          <option>David</option>
        </select>
        <section className="boton-enviar-contenedor">
          <input type="submit" value={"buscar"}></input>
        </section>
      </form>
      <section className="resumen">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};
export default ResumenCitas;

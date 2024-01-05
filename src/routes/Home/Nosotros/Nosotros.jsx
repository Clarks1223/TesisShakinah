import NosotrosComponents from "../../../components/Home/NosotrosComponent/NosotrosComponent";
import "./Nosotros.css";
export const Nosotros = () => {
  return (
    <>
      <section className="Nosotros">
        <section className="Nosotros-titulo">
          <h1>Shakinah Peluqueria & Estetica</h1>
        </section>
        <NosotrosComponents
          titulo="¿Quienes somos?"
          texto="Somos una empresa ecuatoriana dedicados a la belleza del cabello y del cuerpo. El bienestar es primordial en todo lo que hacemos. Creemos que la belleza exterior empieza en tu interior, por eso cuidamos todos los detalles creando un ambiente diseñado para que celebres tu ser interior. ​Vamos a la par de las nuevas tendencias de la moda, por lo que siempre estamos creando e innovando nuestros productos para su total satisfacción. Manejamos estándares de calidad en nuestros servicios."
          imagen="https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/Nosotros%2F1.png?alt=media&token=01790197-1034-48a0-acb7-47983d2c96fc"
        />
        <NosotrosComponents
          titulo="Nuestro objetivo"
          texto="Ofrecer servicios de excelencia en peluquería y cosmetología, destacándonos por la creatividad, profesionalismo y atención personalizada, para realzar la belleza integral de nuestros clientes y satisfacer sus necesidades estéticas con las últimas tendencias en cortes de cabello, tratamientos capilares y servicios de cuidado de la piel."
          imagen="https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/Nosotros%2FObjetivo.png?alt=media&token=9199defb-d98f-4c89-871f-4e81584effb8"
        />
        <NosotrosComponents
          titulo="Nuesta historia"
          texto="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          imagen="https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/Nosotros%2FHistoria.png?alt=media&token=b3f19416-5bc1-4847-8e8e-cedb73b1f700"
        />
      </section>
    </>
  );
};
export default Nosotros;

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
          titulo="Nuestra historia"
          texto="En el año 2016, en el sector del Pinar Alto en la ciudad de Quito, nacía Shakinah Imagen & Estética, una pequeña peluquería con grandes sueños. Su fundadora, Gloria Quiñonez, tenía una visión clara: crear un espacio donde la belleza se fusionara con la atención personalizada y el ambiente acogedor. Aunque al principio las cosas fueron difíciles, Gloria estaba decidida a convertir su peluquería en un referente en la ciudad de Quito.
          Los primeros años fueron de constante aprendizaje y esfuerzo. Gloria y su equipo se esforzaron por perfeccionar sus habilidades, seguir las últimas tendencias y, lo más importante, construir relaciones sólidas con sus clientes. La calidad del servicio y la atención al cliente se convirtieron en pilares fundamentales para la peluquería Shakinah.
          Con el paso de los años, Shakinah se consolidó como una de las mejores peluquerías del Pinar Alto. La introducción de servicios exclusivos, eventos especiales y colaboraciones con otras empresas locales contribuyeron a su éxito continuo.
          En el año 2024, conscientes de la importancia de adaptarse a las nuevas tendencias digitales, La peluquería decidió dar un paso más en la expansión sus servicios mediante la creación de su propia página web. Con el objetivo de ofrecer una experiencia más completa y accesible para sus clientes, la página web se convirtió en una plataforma que no solo mostraba los servicios y horarios de la peluquería, sino que también facilitaba la reserva de citas en línea."
          imagen="https://firebasestorage.googleapis.com/v0/b/paginawebymovil.appspot.com/o/Nosotros%2FPeluqueria.jpg?alt=media&token=47aeec3d-d496-4b6d-a5df-8363c7c22f3e"
        />
      </section>
    </>
  );
};
export default Nosotros;

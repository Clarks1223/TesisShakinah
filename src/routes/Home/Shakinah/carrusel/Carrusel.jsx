import { useEffect, useState } from "react";
import "./carrusel.css";
import { data } from "./data";

const Carrusel = () => {
  const [imgIndex, setImgIndex] = useState(1);

  const handlePrevClick = () => {
    setImgIndex((prevIndex) => (prevIndex - 1 < 1 ? 3 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setImgIndex((prevIndex) => (prevIndex + 1 > 3 ? 1 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      <section className="carousel-buttons">
        <button
          className="carousel-button button-atras"
          onClick={handlePrevClick}
        >
          -
        </button>
        <button
          className="carousel-button button-siguiente"
          onClick={handleNextClick}
        >
          +
        </button>
      </section>
      <img
        className="carousel-image"
        src={data[imgIndex].imgUrl}
        alt={`Slide ${imgIndex}`}
      />
    </div>
  );
};

export default Carrusel;

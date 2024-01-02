import React from "react";
import { useLocation } from "react-router-dom";

function ErrorRoute() {
  const location = useLocation();

  return (
    <div>
      <h2>Error</h2>
      <p>La ruta '{location.pathname}' no existe</p>
    </div>
  );
}

export default ErrorRoute;

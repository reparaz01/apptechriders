// Charlas.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Charlas = () => {
  return (
    <section className="charlas-section">
      <div className="charlas-content">
        <h1>Título de Charlas</h1>
        <h2>Subtítulo de Charlas</h2>
      </div>

      {/* Aplica estilos de Bootstrap solo a la tabla */}
      <table className="table table-bordered table-striped table-light">
        <thead>
          <tr>
            <th>Encabezado 1</th>
            <th>Encabezado 2</th>
            {/* Agrega más encabezados según sea necesario */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dato 1</td>
            <td>Dato 2</td>
            {/* Agrega más datos según sea necesario */}
          </tr>
          {/* Agrega más filas según sea necesario */}
        </tbody>
      </table>
    </section>
  );
};

export default Charlas;

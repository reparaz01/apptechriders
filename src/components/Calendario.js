import React, { useState, useEffect } from 'react';
// Asegúrate de tener la ruta correcta para tu archivo de estilos CSS

const Calendario = () => {
  const [charlas, setCharlas] = useState([]);
  const [mesActual, setMesActual] = useState(new Date());

  // Simula una llamada a una API para obtener las charlas
  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API real
    // Puedes usar fetch o axios, por ejemplo
    const obtenerCharlas = async () => {
      // Supongamos que la API retorna un arreglo de charlas
      const response = await fetch('URL_DE_TU_API');
      const data = await response.json();
      setCharlas(data);
    };

    obtenerCharlas();
  }, []); // Se ejecuta solo al montar el componente

  const obtenerBotonCharla = (charla) => (
    <button className="btn btn-primary" onClick={() => accederCharla(charla)}>
      {charla.nombre}
    </button>
  );

  const accederCharla = (charla) => {
    // Lógica para acceder a la charla, por ejemplo, redireccionar a una página de detalles
    console.log(`Acceder a la charla: ${charla.nombre}`);
  };

  const obtenerDiasDelMes = (mes) => {
    const primerDiaDelMes = new Date(mes.getFullYear(), mes.getMonth(), 1);
    const ultimoDiaDelMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);
    const primerDiaSemana = primerDiaDelMes.getDay();
    const totalDias = ultimoDiaDelMes.getDate();

    const diasDelMes = Array.from({ length: totalDias + primerDiaSemana }, (_, index) => {
      if (index < primerDiaSemana) {
        return null;
      }
      const dia = index - primerDiaSemana + 1;
      const fecha = new Date(mes.getFullYear(), mes.getMonth(), dia);
      const charlaDelDia = charlas.find((c) => c.fecha === fecha.toISOString().split('T')[0]);
      return { dia, fecha, charlaDelDia };
    });

    return diasDelMes;
  };

  const cambiarMes = (direccion) => {
    const nuevoMes = new Date(mesActual);
    if (direccion === 'siguiente') {
      nuevoMes.setMonth(nuevoMes.getMonth() + 1);
    } else {
      nuevoMes.setMonth(nuevoMes.getMonth() - 1);
    }
    setMesActual(nuevoMes);
  };

  return (
    <div className="container">
      <h2 className="mb-4">{mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-dark" onClick={() => cambiarMes('anterior')}>Mes Anterior</button>
        <button className="btn btn-dark" onClick={() => cambiarMes('siguiente')}>Mes Siguiente</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>L</th>
            <th>M</th>
            <th>X</th>
            <th>J</th>
            <th>V</th>
            <th>S</th>
            <th>D</th>
          </tr>
        </thead>
        <tbody>
            {Array.from({ length: 6 }, (_, semana) => (
                <tr key={semana}>
                {obtenerDiasDelMes(mesActual).slice(semana * 7, (semana + 1) * 7).map((diaInfo, index) => (
                    <td key={index}>
                    {diaInfo && (
                        <div className="d-flex flex-column">
                        <span className="fw-bold">{diaInfo.dia}</span>
                        {diaInfo.charlaDelDia ? obtenerBotonCharla(diaInfo.charlaDelDia) : null}
                        </div>
                    )}
                    </td>
                ))}
                </tr>
            ))}
</tbody>
      </table>
    </div>
  );
};

export default Calendario;

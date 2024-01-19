import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Global from './Global';
import loadImage from '../assets/images/loading.gif';

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Limpiar localStorage
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('token');

    // Reset del tipo de usuario y el token en Global
    Global.tipoUsuario = 0;
    Global.token = "";

    // 1 segundo de carga
    const timeoutId = setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);

    // Limpiar el temporizador
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '200px' }}>
      {loading ? (
        <>
          <img src={loadImage} alt="Cargando..." style={{ maxWidth: '200px' }} />
          <h1>Cargando...</h1>
        </>
      ) : null}
    </div>
  );
};

export default Logout;
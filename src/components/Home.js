import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
 /* import Calendario from './Calendario'; */
import charlas from '../assets/images/charlas.jpg';
import Global from './Global';

import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle"; 

class Home extends Component {

componentDidMount(){
    console.log("home" + Global.tipoUsuario);
}


  render() {
    return (
      <div id="main" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <section style={{ position: 'relative', textAlign: 'center', color: 'white', marginTop: '00px', flex: 1 }}>
          {/* Imagen de fondo */}
          <img
            src={charlas}
            alt="Charlas"
            className="charlas-image"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Contenido antes del div blanco */}
          <h1 style={{ color: 'white', marginTop: '20px' }}>Charlas Disponibles</h1>
          <p style={{ color: 'white', marginBottom: '35px', fontSize: '27px' }}>Selecciona una charla para acceder a sus datos</p>


          {/* Div blanco que ocupa la mitad de la página */}
          <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '0px', padding: '40px', marginTop: '20px', marginBottom: '50px' }}>
            {/* Contenido dentro del fondo blanco */}
            <button> Hola</button>

          </div>

          {/* Espacio después del div blanco */}
          <div style={{ height: '50vh' }}></div>

          <div id="calendario"></div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Home;

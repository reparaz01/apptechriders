import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import charlas from '../assets/images/charlas.jpg';
import '../styles/Home.css'; 

class Home extends Component {
  render() {
    return (
      <div id="main" className="site-main container">
        <Navbar />

        {/* Sección con imagen "charlas" */}
        <section id="charlas-section">
          <div className="charlas-content">
            <h1>Título de Charlas</h1>
            <h2>Subtítulo de Charlas</h2>
          </div>
          <img src={charlas} alt="Charlas" className="charlas-image" />
        </section>

        {/* Contenido específico de Home va aquí */}
        <div id="primary" className="content-area">
          <main id="content" className="site-content" role="main">
            <section>
              <h2>Título de la sección, Modificado Jhon</h2>
              {/* Agrega tu contenido específico aquí */}
            </section>
          </main>
        </div>

        <Footer /> {/* Usa el componente Footer aquí */}
      </div>
    );
  }
}

export default Home;

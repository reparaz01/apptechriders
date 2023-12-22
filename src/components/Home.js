import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div id="main" className="site-main container">
        <div id="primary" className="content-area">
          <main id="content" className="site-content" role="main">
            {/* Contenido específico de Home va aquí */}
            <section>
              <h2>Título de la sección</h2>
              {/* Agrega tu contenido específico aquí */}
            </section>
          </main>
        </div>

        {/* Footer */}
        <div id="footer-wrap" className="site-footer clr">
          <footer id="copyright-wrap" className="clr">
            <div id="copyright" role="contentinfo" className="clr">
              <div className="site-info">
                <div className="footer-logo">
                  <img src="https://techclub.tajamar.es/wp-content/uploads/2018/07/escudo-negativo-blog.png" alt="Footer Logo" />
                </div>
                <p className="footer-first">© 2023 FP + Professional Education</p>
                <p>
                  <strong>Dirección:</strong>
                  Calle Pío Felipe 12, 28038, Madrid <br />
                  <strong>Teléfonos:</strong>
                  91 757 18 17 / 91 478 34 98
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Home;

/* Footer.js */

import React, { Component } from 'react';
import '../styles/Footer.css';
import logotajamar from '../assets/images/logotajamar.png';

class Footer extends Component {
  render() {
    return (
      <div id="footer-wrap" className="site-footer clr text-white">
        <footer id="copyright-wrap" className="clr">
          <div id="copyright" role="contentinfo" className="clr container">
            <div className="site-info">
              <table>
                <tbody>
                  <tr>
                    <td className="footer-logo">
                      <img src={logotajamar} alt="Footer Logo" className="footer-img" />
                    </td>
                    <td className="spacer-cell"></td> {/* Celda espaciadora */}
                    <td className="text-cell">
                      <p className="footer-first">© 2024 FP + Professional Education</p>
                      <p>
                        <strong>Dirección:</strong> Calle Pío Felipe 12, 28038, Madrid <br />
                        <strong>Teléfonos:</strong> 91 757 18 17 / 91 478 34 98
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
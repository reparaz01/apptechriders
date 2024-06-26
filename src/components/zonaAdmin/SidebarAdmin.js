// SidebarAdmin.js
import React, { Component } from 'react';
import './../../styles/zonaAdmin.css';

class SidebarAdmin extends Component {
  render() {
    const { onComponentChange } = this.props;

    return (
      <div className="sidebar-admin">
        <h2>Dashboard Admin</h2>
        <button onClick={() => onComponentChange('InfoAdmin')}>Perfil</button>
        <button onClick={() => onComponentChange('TodosUsuarios')}>Usuarios</button>
        <button onClick={() => onComponentChange('TodosCharlas')}>Charlas</button>
        <button onClick={() => onComponentChange('TodosEmpresas')}>Empresas</button>
        {/* Agrega más botones según sea necesario */}
      </div>
    );
  }
}

export default SidebarAdmin;

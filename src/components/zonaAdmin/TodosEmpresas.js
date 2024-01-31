//Este componente muestra todas los usuarios que hay en la BBDD.

import React, { Component, useEffect } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default class TodosEmpresas extends Component {
    // State. Zona de valores y cambios.
    state = {
        empresas: {}, // Estado para almacenar todos los usuarios
        statusEmpresas: false, // Estado para verificar si los usuarios se han cargado correctamente
        searchTerm: '', // Nuevo estado para el término de búsqueda
        filteredEmpresas: [], // Nuevo estado para almacenar usuarios filtrados
        estadoEmpresa : {},
        statusEstadoEmpresa: false,
        redirectTo: null // variable para redireccionar
    };

    // Método para buscar y guardar todos los usuarios.
    getEmpresas = () => {
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = 'api/EmpresasCentros/EmpresasFormato';
        var url = Global.urlApi + request;

        axios.get(url, { headers }).then((response) => {
            this.setState({
                empresas: response.data,
                filteredEmpresas: response.data, // Inicialmente, los usuarios filtrados son iguales a todos los usuarios
                statusEmpresas: true,
            });
        });
    };

    // Método para manejar cambios en el cuadro de búsqueda.
    handleSearchChange = (event) => {
        // Guarda el valor del search 
        var searchTerm = event.target.value;
        this.setState({ searchTerm }, () => {
            // Llama a performSearch cada vez que se actualiza el término de búsqueda
            this.performSearch();
        });
    };

    // Método para realizar la búsqueda
    performSearch = () => {
        var { searchTerm, empresas } = this.state;

        // Filtra los usuarios basándose en el término de búsqueda
        const filteredEmpresas = empresas.filter(
            (empresas) =>
                empresas.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                empresas.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                empresas.personaContacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                empresas.tipoEmpresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                empresas.descripcionEstado.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ filteredEmpresas });
    };

    // Método para manejar cambios en el select
    handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        //alert("Valor seleccioando : " + selectedOption);
        this.setState({ 
        selectedOption, 
        redirectTo: "/todosEstadoEmpresa/"+selectedOption 
        })
    };

    componentDidMount() {
        this.getEmpresas();
    }

    render() {
        return (
            <div>
                <div className="dashboard-body">
                    <div className="cajas-arriba">
                        <div>
                            {/* Agregar un select con diferentes opciones */}
                            <label>¿Qué tipo de Empresa buscas? </label>
                            <select
                                className="form-select"
                                id="selectOpciones"
                                aria-label="Default select example"
                                value={this.state.selectedOption}
                                onChange={this.handleSelectChange}
                                defaultValue={"Seleccione una opcion"}
                                >
                                {/* Valor puesto manuealmente, mejorar a forma automatica(No hay API para recuperar los estados de empresa , en este caso de pendiente y activo) */}
                                <option>Seleccione una opción</option>
                                <option value={1}>Activo</option>
                                <option value={0}>Pendiente</option>
                            </select>
                        </div>
                        <div>
                            <label>Búsqueda rápida </label>
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-1"
                                    type="search"
                                    placeholder="Escribe aqui..."
                                    aria-label="Search"
                                    value={this.state.searchTerm}
                                    onChange={this.handleSearchChange}
                                />
                            </form>
                        </div>
                    </div>
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Provincia</th>
                                    <th>Persona Contacto</th>
                                    <th>Tipo Empresa</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.statusEmpresas === true &&
                                    this.state.filteredEmpresas.map((empresas, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> </td>
                                                <td>{empresas.nombre} </td>
                                                <td>{empresas.provincia}</td>
                                                <td>{empresas.personaContacto}</td>
                                                <td>{empresas.tipoEmpresa}</td>
                                                <td>{empresas.descripcionEstado}</td>
                                                <td>
                                                    <NavLink to={'/infoEmpresa/'+empresas.idEmpresaCentro} className="btn btn-info">
                                                        Informacion
                                                    </NavLink>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    {this.state.redirectTo && <RedirectTo path={this.state.redirectTo} />} 
                </div>
            </div>
        );
    }
}

// Método para Redireccionar sin NavLink
const RedirectTo = ({ path }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      navigate(path);
    }, [navigate, path]);
  
    return null;
};
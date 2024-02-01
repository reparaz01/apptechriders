import React, { Component } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap from "@fullcalendar/bootstrap";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import Global from './Global';
import './../styles/calendario.css'; 

class Calendario extends Component {
  state = {
    charlas: [],
    status: false
  };

  componentDidMount() {
    this.getCharlas();
  }

  getCharlas = () => {
    var request = "api/charlas";
    var url = Global.urlApi + request;
    axios.get(url)
      .then(response => {
        this.setState({
          charlas: response.data,
          status: true
        });
      })
      .catch(error => {
        console.error('Error al obtener charlas:', error);
        // Manejar el error según tus necesidades
      });
  };

  handleEventClick = (clickInfo) => {
    const idCharlaSeleccionada = clickInfo.event.id;
    localStorage.setItem('idCharlaSeleccionada', idCharlaSeleccionada);

    // Redirige a DetallesCharla
    window.location.href = "/detallesCharla";
  };

  handleEvents = (events) => {
    console.log(events);
  };

  renderEventContent = (eventInfo) => {
    const idCharlaSeleccionada = eventInfo.event.id;

    return (
      <div
        onClick={() => {
          localStorage.setItem('idCharlaSeleccionada', idCharlaSeleccionada);
          window.location.href = "/detallesCharla";
        }}
        style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es interactivo
      >
        <b>{eventInfo.timeText}</b>
        <br />
        <b>{eventInfo.event.title}</b>
      </div>
    );
  };

  render() {
    const { charlas } = this.state;

    const events = charlas.map(charla => ({
      title: charla.descripcion,
      date: new Date(charla.fechaCharla).toISOString().split('T')[0],
      id: charla.idCharla
    }));

    return (
      <div className="App">
        <div className="card">
          <div className="card-header">
            <div className="card-header-toolbar"></div>
          </div>
          <div className="card-body" style={{ width: "1400px" }}>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                bootstrap,
                timeGrid,
                calenderList
              ]}
              initialView="dayGridMonth"
              events={events}
              eventColor="#000000"
              themeSystem="bootstrap"
              navLinks={true}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,calenderList"
              }}
              locales="allLocales"
              locale="es"
              firstDay="1"
              editable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              eventContent={this.renderEventContent}
              eventsSet={this.handleEvents}
              height={700}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calendario;

import React, { Component } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap from "@fullcalendar/bootstrap";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
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
    console.log(clickInfo);
  };

  handleEvents = (events) => {
    console.log(events);
  };

  renderEventContent = (eventInfo) => {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <br />
        <b>{eventInfo.event.title}</b>
      </div>
    );
  };

  render() {
    const { charlas } = this.state;

    // Transforma las charlas en el formato esperado por FullCalendar
    const events = charlas.map(charla => ({
      title: charla.descripcion, 
      date: new Date(charla.fechaCharla).toISOString().split('T')[0] 
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
                interaction,
                timeGrid,
                calenderList
              ]}

              initialView="dayGridMonth"
              events={events}
              eventColor="#378006"
              themeSystem="bootstrap"
              navLinks="true"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,calenderList"
              }}
              locales="allLocales"
              locale="es"
              firstDay="1"
              editable={false} // Desactiva la edición y el arrastre
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              eventContent={this.renderEventContent}
              eventClick={this.handleEventClick}
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

import React, { useState,useEffect } from 'react';
import cn from "classnames";
import { Calendar, momentLocalizer, TimeGrid } from 'react-big-calendar';
import moment from 'moment';
import Icon from "../Icon";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from "./MyCalendar.module.sass";

const localizer = momentLocalizer(moment);
const initialEvents = [
  {
    start: new Date(2023, 2, 1, 10, 0),
    end: new Date(2023, 2, 1, 12, 0),
    title: 'Reunião com o cliente'
  },
  {
    start: new Date(2023, 2, 1, 10, 0),
    end: new Date(2023, 2, 1, 12, 0),
    title: 'Reunião1 com o cliente'
  },
  {
    start: new Date(2023, 2, 1, 10, 0),
    end: new Date(2023, 2, 1, 12, 0),
    title: 'Reunião2 com o cliente'
  },
  {
    start: new Date(2023, 2, 1, 10, 0),
    end: new Date(2023, 2, 1, 12, 0),
    title: 'Reunião3 com o cliente'
  },
  {
    start: new Date(2023, 2, 3, 14, 0),
    end: new Date(2023, 2, 3, 16, 0),
    title: 'Treinamento da equipe'
  }
];
const MyCalendar = ({items, setIdToDel, setVisibleDelModal, DetailAgenda,getAgendaClienteDetail, CancelarReunião,setVisibleDetailModal}) => {
  var itemEvent= [];
  const [events, setEvents] = useState(itemEvent);

  useEffect(() => {
    if(items.length>0){
      var descricao="";
      items.map((x, index) => (
        itemEvent.push(
          {
            start: new Date(new Date(x.day).getFullYear(), new Date(x.day).getMonth(), new Date(x.day).getDate(),
            new Date(x.day + ' '+x.begin_hour).getHours(),new Date(x.day + ' '+x.begin_hour).getMinutes()),
            end: new Date(new Date(x.day).getFullYear(), new Date(x.day).getMonth(), new Date(x.day).getDate(), 
            new Date(x.day + ' '+x.end_hour).getHours(), new Date(x.day + ' '+x.end_hour).getMinutes()),
            title: getTitle(x),
            state: x.id_state
          },
        )
    
      ))
      setEvents(itemEvent)
      console.log("ItemEvent=", new Date(items[0].day + ' '+items[0].begin_hour).getHours())
    }
    
},[items]);
 
function getTitle(x){
  if(x.id_state===3){
    return (<a onClick={()=>{setVisibleDetailModal(true); getAgendaClienteDetail(x.id)}}>Reunião com Cliente</a>)
  }else if(x.id_state===1){
    return (<button className={cn("button-stroke-red status-green", styles.button)} style={{height: "0px", padding: "0px"}}
     onClick={()=>{setIdToDel(x.id); setVisibleDelModal(true)}}>
        Disponivel <Icon name="trash" size="17" />
      </button>)

  }else{
    return (<a className={cn("status-red-dark")} >Cancelado</a>)
  }
}
  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Digite o título do evento:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };
  const handleEventClick = (event) => {
    const title = window.prompt('Digite o novo título do evento:', event.title);
    if (title) {
      const updatedEvent = { ...event, title };
      const updatedEvents = events.map((e) => (e === event ? updatedEvent : e));
      setEvents(updatedEvents);
    }
  };
  const handleEventDelete = (event) => {
    const confirmed = window.confirm(`Deseja excluir o evento "${event.title}"?`);
    if (confirmed) {
      const updatedEvents = events.filter((e) => e !== event);
      setEvents(updatedEvents);
    }
  };

  return (
    <div style={{ height: '500pt' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        /*
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventClick}
        onDoubleClickEvent={handleEventDelete}
        */
      />


    </div>
  );
};

export default MyCalendar;

import React, { useState } from "react";
import styles from "./Schedule.module.sass";
import cn from "classnames";


const Schedule = ({ DetailAgenda,CancelarReunião, setVisibleModal}) => {

  const [ConfirmBotton, setConfirmBotton] = useState(0);

  return (
    <div className={cn(styles.schedule)}>
      <div className={cn("title-red", styles.title)}>Detalhes da Consulta</div>
      
      <div className={styles.note} style={{textAlign: "center"}}>
        Dados do cliente para a reunião da consulta do dia <br></br>{DetailAgenda.day } as {DetailAgenda.begin_hour}
      </div><br></br>
      
      <div className={styles.list}>
       <p>Cliente: {DetailAgenda.first_name+ ' '+ DetailAgenda.last_name}</p>
       <p>Email: {DetailAgenda.email}</p>
       <p>Whatsapp: {DetailAgenda.phone}</p>
       <p>Pais: {DetailAgenda.country}</p>
      </div><br></br>
      <div className={styles.btns}>
        {
          ConfirmBotton==0?
        (<button className={cn("button-stroke-red", styles.button)} onClick={()=>setConfirmBotton(1)}>Cancelar consulta</button>)
        :
        (
        <div>
          <span>Tens certeza que desejas cancelar essa reunião ? </span>
          <button className={cn("button-stroke-red", styles.button)} onClick={()=>setConfirmBotton(0)}>Não </button>
          <button className={cn("button-stroke-red", styles.button)} onClick={()=>{CancelarReunião(DetailAgenda.id);}}>Sim</button>
        </div>
        
        )
        }
      </div>
    </div>
  );
};

export default Schedule;

import React, { useState } from "react";
import styles from "./Follower.module.sass";
import cn from "classnames";
import { Link } from "react-router-dom";

import { numberWithCommas } from "../../../utils.js";

const Follower = ({ className, item, followers, setVisibleDelModal, setIdAgenda, setIdProfissinal}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(styles.follower, className)}>
      <div className={styles.details}>
        {/*
        <div className={styles.avatar}>
          <img src={"http://127.0.0.1:8000"+item.photo} alt="Avatar" />
        </div>
        */}
        <div className={styles.wrap}>
          <div className={styles.man}>{item.first_name+ " "+ item.last_name}</div>
          <div className={styles.list}>
            <div className={styles.counter}>
              Financeiro
            </div>
            <div className={styles.counter}>
              Economista
            </div>
          </div>
          <div className={styles.list}>
            Avaliação {item.state}
          </div>
          <div className={styles.counter}>
            {item.resume}
          </div>
        </div>
      </div>
      <div className={styles.gallery}>
        
        {item.schedule.map((x, index) => (
          (x.id_state === 1) ?
          (<div key={index} className={styles.preview} onClick={()=>{setIdAgenda(x.id); setIdProfissinal(item.id); setVisibleDelModal(true)}}>
          <span>{x.day}<br></br>{x.begin_hour}</span>
        </div>):
          (<div key={index} style={{margin: "5px", border: "1px solid #333"}}>
            <span>{x.day}<br></br>{x.begin_hour}</span>
          </div>)
        

        ))}
      </div>
    </div>
  );
};

export default Follower;

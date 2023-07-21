import React, {useState,useEffect} from "react";
import cn from "classnames";
import styles from "./PayoutHistory.module.sass";
import Card from "../../../components/Card";
import { numberWithCommas } from "../../../utils.js";
import Icon from "../../../components/Icon";
import Modal from "../../../components/Modal";
import axios from "axios";

const PayoutHistory = ({ className , items, setIdToDel, setVisibleDelModal}) => {

  const [loader, setLoader] = useState(false);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Minha Agenda"
      classTitle="title-blue"
    >
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>Data</div>
            <div className={styles.col}>Inicio</div>
            <div className={styles.col}>Termino</div>
            <div className={styles.col}>Estado</div>
            <div className={styles.col}>Eliminar</div>
           
          </div>
          {items.map((x, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.col}>{x.day}</div>
              <div className={styles.col}>{x.begin_hour}</div>
              <div className={styles.col}>{x.end_hour}</div>
              <div className={styles.col}>
              {(x.id_state===3)&& <div className={ styles.ocupado} style={{color: "red"}}>Ocupado</div>}
                
              
              </div>
              <div className={styles.col}>
                <button className={cn("button-stroke-red", styles.button)} onClick={()=>{setIdToDel(x.id); setVisibleDelModal(true)}}>
                  <Icon name="trash" size="24" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </Card>
  );
};

export default PayoutHistory;

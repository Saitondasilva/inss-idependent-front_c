import React, {useState,useEffect} from "react";
import cn from "classnames";
import styles from "./PayoutHistory.module.sass";
import Card from "../../../components/Card";
import { numberWithCommas } from "../../../utils.js";
import axios from "axios";

const PayoutHistory = ({ className }) => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    getSubscribes();
  }, []);
  
  function getSubscribes(){

    const result= axios
      .get("/candidate/getAllProfissional")
      .then((response) => {
        console.log(response);
        setItems(response.data.data.Profissional)
        return response;
        
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
};
  return (
    <Card
      className={cn(styles.card, className)}
      title="Lista de Profissionais"
      classTitle="title-blue"
    >
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>Nome</div>
            <div className={styles.col}>Sobrenome</div>
            <div className={styles.col}>Email</div>
            <div className={styles.col}>Data Nasc.</div>
            <div className={styles.col}>Genero</div>
            <div className={styles.col}>Nacionalidade</div>
            <div className={styles.col}>Tel</div>           
            <div className={styles.col}>Estado</div>           
          </div>
          {items.map((x, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.col}>{x.first_name}</div>
              <div className={styles.col}>{x.last_name}</div>
              <div className={styles.col}>{x.email}</div>
              <div className={styles.col}>{x.birth_date}</div>
              {x.gender===1 ? (
                <div className={styles.col}>Masculino</div>
              ):x.gender===2
              (<div className={styles.col}>Feminino</div>)
              }
              
              
              <div className={styles.col}>{x.nationality}</div>
              <div className={styles.col}>{x.phone}</div>
              {x.id_state===2 ? (
                <div className={styles.col}> Activo </div>
              ):
              x.id_state===1 ?(
              <div className={styles.colorpendente}> Pendente </div>
              ):(
                <div className={styles.colordesabled}> Desactivo </div>
              )
              }
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PayoutHistory;

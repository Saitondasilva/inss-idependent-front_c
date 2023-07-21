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
      .get("/getcontact")
      .then((response) => {
        console.log(response);
        setItems(response.data.data);
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
      title="Lista de Mensagens"
      classTitle="title-blue"
    >
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>Nome</div>
            <div className={styles.col}>Email</div>
            <div className={styles.col}>Fone</div>
            <div className={styles.col}>Assunto</div>
            <div className={styles.col}>Data</div>
           
          </div>
          {items.map((x, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.col}>{x.name}</div>
              <div className={styles.col}>{x.email}</div>
              <div className={styles.col}>{x.phone}</div>
              <div className={styles.col}>{x.subject}</div>
              <div className={styles.col}>{x.created_at}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PayoutHistory;

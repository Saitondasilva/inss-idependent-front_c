import React, { useState,useEffect } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../../components/Icon";
import { useParams } from "react-router-dom";

import axios from "axios";

const Control = ({
  className,
  startDate,
  setStartDate,
  startTime,
  setStartTime
 
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const {id_do_contribute}=useParams();
  const [items, setItems] = useState([]);
  const [userData, setuserData] = useState({});
  const colluns =["Mes","Ano","Valor"];
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro",
"Outubro", "Novembro","Dezembro"];

  function GetMesContribuicao(user) {
    return axios
      .get("/utente/getMesesContribuicao/"+id_do_contribute,{
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
       console.log(response.data.data)
       setItems(response.data.data)
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  };
  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    GetMesContribuicao(user);
  },[]);

  return (
    <>
   
     
      <div className={cn("title-red", styles.title)}>Meses Pagos</div>
      <hr></hr>
        <div className={styles.wrapper}>
          <div className={styles.table}>
            <div className={styles.row}>
              {colluns.map((x,index)=> (
                <div className={styles.col}>{x}</div>
              ))
              }
            </div>
            {items.map((x, index) => (
              <div className={styles.row}>
              <div className={styles.col}>{meses[x.mes-1]}</div>
              <div className={styles.col}>{x.ano}</div>
              <div className={styles.col}>{x.valor}</div>
              </div>
            ))}
          </div>
        </div>
      
    </>
  );
};

export default Control;

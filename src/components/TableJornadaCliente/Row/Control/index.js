import React, { useState,useEffect } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../../Icon";
import Modal from "../../../Modal";
import Schedule from "../../../Schedule";
import axios from "axios";

const Control = ({
  className,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  id_do_contribute
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [items, setItems] = useState([]);
  const [userData, setuserData] = useState({});
  const colluns =["Mes","Ano","Valor"];
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro",
"Outubro", "Novembro","Dezembro"];
  const actions = [
    {
      icon: "more-horizontal",
      action: () => setVisibleModal(true),
    },
    {
      icon: "trash",
      action: () => console.log("delete"),
    },
  ];
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
      <div className={cn(styles.control, className)}>
        {actions.map((x, index) => (
          <button className={styles.button} key={index} onClick={x.action}>
            <Icon name={x.icon} size="20" />
          </button>
        ))}
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
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
      </Modal>
    </>
  );
};

export default Control;

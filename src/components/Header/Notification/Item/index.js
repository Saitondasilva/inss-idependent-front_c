import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Item.module.sass";

const Item = ({ className, item, onClose }) => {

  var type="", message=JSON.parse(item.data);
  if(item.type==="App\\Notifications\\PagContribuicaoNotification"){
    type="Pag. Contribuição";
    item.url="/jornada/cliente"
  }else if(item.type==="App\\Notifications\\RegistroUtenteNotification"){
    type="Reg. de Utente";
    item.url="/carteira/cliente"
  }
  return (
    <Link
      className={cn(styles.item, { [styles.new]: item.read_at }, className)}
      to={item.url}
      onClick={onClose}
    >
      {/*
      <div className={styles.avatar}>
        <img src={item.avatar} alt="Foto" />
        <div className={styles.icon} style={{ backgroundColor: item.color }}>
          <img src={item.icon} alt="Status" />
        </div>
      </div>
      */}
      <div className={styles.details}>
        <div className={styles.line}>
          <div className={styles.subtitle}>{type}</div>
          <div className={styles.login}>{item.login}</div>
          <div className={styles.time}>{(item.created_at)}</div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html:message.message }}
        ></div>
      </div>
    </Link>
  );
};

export default Item;

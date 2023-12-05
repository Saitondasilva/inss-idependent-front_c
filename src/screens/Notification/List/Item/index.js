import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Control from "./Control";
import { Link } from "react-router-dom";

const Item = ({ className, item, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  var type="", message=JSON.parse(item.data);
  if(item.type==="App\\Notifications\\PagContribuicaoNotification"){
    type="Pagamento de Contribuição";
    item.url="/contribuicao/utente"
  }else if(item.type==="App\\Notifications\\RegistroUtenteNotification"){
    type="Registro de Utente";
    item.url="/utente/lista"
  }else if(item.type==="App\\Notifications\\RegistroAgregadoNotification"){
    type="Registro de Agregado";
    item.url="/utente/lista"
  }
  return (
    <Link
      className={cn(styles.item, { [styles.new]: (!item.read_at) }, className)}
      to={item.url}
      onClick={onClose}
    >
     
      <div className={styles.details}>
        <div className={styles.line}>
          <div className={styles.subtitle}>{type}</div>
          <div className={styles.login}>{item.login}</div>
          <div className={styles.time}>{item.created_at} </div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: message.message  }}
        ></div>
        
        {/*
        <div className={styles.comment}>“{item.comment}”</div>
        <Control
          className={styles.control}
          value={visible}
          setValue={setVisible}
          valueAnswer={currentValue}
          setValueAnswer={setCurrentValue}
        />
        */
        }
      </div>
    </Link>
  );
};

export default Item;

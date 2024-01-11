import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../components/Icon";
import Actions from "../../../components/Actions";
import Loader from "../../../components/Loader";

const Panel = ({setVisiblePreview, setVisibleSchedule, SaveProfissionalCliente, utente_id, ClearProfissionalCliente, smsError, smsSucess, loader, AlterarPedido}) => {
  const actions = [
    {
      title: "Preview",
      icon: "expand",
      action: () => setVisiblePreview(true),
    },
    {
      title: "Schedule product",
      icon: "calendar",
      action: () => setVisibleSchedule(true),
    },
    {
      title: "Get shareable link",
      icon: "link",
      action: () => console.log("Get shareable link"),
    },
    {
      title: "Clear data",
      icon: "close",
      action: () => console.log("Clear data"),
    },
  ];

  return (
    <div className={cn("panel", styles.panel)}>
      <div className={styles.info}>
        {loader && <Loader className={styles.loader} />} 
        {smsSucess!=="" && <p style={{color:"green"}}><Icon name="check-all" size="24" />{smsSucess}</p>}
        {smsError!=="" && <p style={{color:"red"}}><Icon name="close-circle" size="24" />{smsError}</p>}
      </div>
      <div className={styles.btns}>
        {utente_id>0? 
        ( <button className={cn("button", styles.button)} onClick={AlterarPedido} ><Icon name="edit" size="24" />Aterar  </button>)
        :
        (<button className={cn("button", styles.button)} onClick={SaveProfissionalCliente} ><Icon name="add" size="24" />Guardar  </button>)
       
        } 
    
        
      </div>
    </div>
  );
};

export default Panel;

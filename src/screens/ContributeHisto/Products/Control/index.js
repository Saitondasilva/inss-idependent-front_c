import React, { useState } from "react";
import styles from "./Control.module.sass";
import { Link} from "react-router-dom";

import cn from "classnames";
import Icon from "../../../../components/Icon";
import Actions from "../../../../components/Actions";
import Modal from "../../../../components/Modal";
import ModalPrint from "../../../../components/ModalPrint";
import Success from "./../Control/Overview/Success";



const Control = ({item, className, visibleActions, setVisibleActions, up, id}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalp, setVisibleModalp] = useState(false);
  const [data1, setData1] = useState({});
  const [data, setData]=useState([])
  const history = useState();
  const actions = [ 

    {
        title: "View comment",
        icon: "message",
        action: () => console.log("View comment"),
      },
      {
        title: "Edit title & description",
        icon: "edit",
        action: () => console.log("Edit title & description"),
      },
     
      {
        title: "Suspensão",
        icon: "heart",
        action: ()  => setVisibleModal(item.id),
        
      },
      
      {
        title: "Reactivação",
        icon: "edit",
        action: ()  => setVisibleModal(item.id),
      },

      {
        title: "Falecimento",
        icon: "edit",
        action: ()  => setVisibleModal(item.id),
      },
      {
        title: "Mudar de Escalão",
        icon: "edit",
        action: ()  => setVisibleModal(item.id),
      },
      {
        title: "Histórico",
        icon: "edit",
        action: () => history.push("/utente/Print/"+id),
      },
  
    ];
    
  return (
    <div className={cn(styles.control, className)}>
      <button className={styles.button}>    
          <Link className="{style.control}"          
           to={"/utente/add/"+id}>
           <Icon name="edit" size="20" />  
          </Link>         
      </button>
      {<button className={styles.button}>
      <Link className="{style.control}"          
           to={"/utente/Print/"+id}>
        <Icon name="info" size="20" />
        </Link> 
      </button>}
      <Actions
        className={styles.actions}
        classActionsHead={styles.actionsHead}
        classActionsOption={styles.actionsOption}
        items={actions}
        visible={visibleActions}
        setVisible={setVisibleActions}
        up={up}
      />
       <Modal
        outerClassName={styles.outer}
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      >
        <Success className={styles.card} data1={data1} setData1={setData1} item={item}/>
      </Modal>

      <ModalPrint
        outerClassName={styles.outer}
        visible={visibleModalp}
        onClose={() => setVisibleModalp(false)}
      >
        <Success className={styles.card} data1={data1} setData1={setData1} item={item}/>
      </ModalPrint>
    </div>

    
  );
};

export default Control;

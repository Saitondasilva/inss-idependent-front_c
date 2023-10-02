import React, { useState } from "react";
import styles from "./Control.module.sass";
import { Link } from "react-router-dom";
import cn from "classnames";
import Icon from "../../../../components/Icon";
import Actions from "../../../../components/Actions";
import Modal from "../../../../components/Modal";
import Success from "./../Control/Overview/Success";


const Control = ({item, className, visibleActions, setVisibleActions, up, id}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [data1, setData1] = useState({});
  const [data, setData]=useState([])

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
    ];
    
  return (
    <div className={cn(styles.control, className)}>
      <button className={styles.button}>    
          <Link className="{style.control}"          
           to={"/utente/add/"+id}>
           <Icon name="edit" size="20" />  
          </Link>         
      </button>
      {/*<button className={styles.button}>
        <Icon name="heart" size="20" />
      </button>*/}
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
        <Success className={styles.card} data1={data1} setData1={setData1}/>
      </Modal>
    </div>

    
  );
};

export default Control;

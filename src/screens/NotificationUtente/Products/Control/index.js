import React from "react";
import styles from "./Control.module.sass";
import { Link } from "react-router-dom";
import cn from "classnames";
import Icon from "../../../../components/Icon";
import Actions from "../../../../components/Actions";

const actions = [
  {
    title: "Edit product",
    icon: "edit",
    action: () => console.log("Edit product"),
  },
{/*  {
    title: "View comment",
    icon: "message",
    action: () => console.log("View comment"),
  },*/},
  {
    title: "Edit title & description",
    icon: "edit",
    action: () => console.log("Edit title & description"),
  },
 
  {
    title: "Delete forever",
    icon: "trash",
    action: () => console.log("Delete forever"),
  },
];

const Control = ({item, className, visibleActions, setVisibleActions, up }) => {
  return (
    <div className={cn(styles.control, className)}>
      <button className={styles.button}> 
        
      <Link className={styles.control}         
            to={"/products/editar/"}>
           <Icon name="edit" size="20" /> 
          </Link>       
          
      </button>
      {<button className={styles.button}>
        <Icon name="message" size="20" />
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
    </div>
  );
};

export default Control;

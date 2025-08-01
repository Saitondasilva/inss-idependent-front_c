import React, { useState } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../../Icon";
import Schedule from "../../../Schedule";
import { Link } from "react-router-dom";


const Control = ({
  className,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  setVisibleModal,
}) => {


  const actions = [
    {
      icon: "arrow-next",
      text: "Validar",
      action: () => setVisibleModal(true),
    },
    /*{
      icon: "calendar",
      action: () => setVisibleModal(true),
    },
    {
      icon: "edit",
      action: () => console.log("edit"),
    },
    {
      icon: "trash",
      action: () => console.log("delete"),
    },*/
  ];
function showModalNextStep(){
  setVisibleModal(true)
}
  return (
    <>
      <div className={cn(styles.control, className)}>
        {actions.map((x, index) => (
          <div className={styles.button} key={index} onClick={()=>showModalNextStep()}>
            {x.text} <Icon name={x.icon} size="20" />       
         
          </div>
          
        ))}
      </div>
           
    </>
  );
};

export default Control;

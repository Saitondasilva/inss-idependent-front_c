import React, { useState } from "react";
import styles from "./Control.module.sass";
import cn from "classnames";
import Icon from "../../../Icon";
import Schedule from "../../../Schedule";


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
      text: "Avançar etapa",
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
          <button className={styles.button} key={index} onClick={()=>showModalNextStep()}>
            {x.text} <Icon name={x.icon} size="20" />
          </button>
        ))}
      </div>
     
    </>
  );
};

export default Control;

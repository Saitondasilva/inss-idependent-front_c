import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";

const items = [
  {
    title: "Consultas agendadas",
    counter: "12",
    icon: "activity",
    color: "#B5E4CA",
    tooltip: "Small description Current account balance",
  },
  {
    title: "Agendamentos Cancelados",
    counter: "1",
    icon: "pie-chart",
    color: "#CABDFF",
    tooltip: "Small description Available for withdrawal",
  },
];

const Overview = ({ className, setVisibleModal }) => {


  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Balanço dos agendamentos"
        classTitle="title-blue"
      >
        <div className={styles.overview}>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div className={styles.item} key={index}>
                <div
                  className={styles.icon}
                  style={{ backgroundColor: x.color }}
                >
                  <Icon name={x.icon} size="24" />
                </div>
                <div className={styles.details}>
                  <div className={styles.label}>
                    {x.title}
                    <Tooltip
                      className={styles.tooltip}
                      title={x.tooltip}
                      icon="info"
                      place="top"
                    />
                  </div>
                  <div className={styles.counter}>{x.counter}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModal(true)}
          >
            <Icon name="add" size="24" />
            Nova Disponibilidade
          </button>
        </div>
      </Card>
      <TooltipGlodal />
      
    </>
  );
};

export default Overview;

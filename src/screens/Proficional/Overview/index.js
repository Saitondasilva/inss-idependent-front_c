import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import Modal from "../../../components/Modal";
import Success from "./Success";

const items = [
  {
    title: "Pensões a efectuar",
    counter: "128k SDT",
    icon: "activity",
    color: "#B5E4CA",
    tooltip: "Small description Current account balance",
  },
  {
    title: "Subsidios a efectuar",
    counter: "0.00 STD",
    icon: "pie-chart",
    color: "#CABDFF",
    tooltip: "Small description Available for withdrawal",
  },
];

const Overview = ({ className }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Balanço Actual"
        classTitle="title-blue"
      >
        <div className={styles.overview}>
          {<div className={styles.list}>
            {/*items.map((x, index) => (
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
                 { /*<div className={styles.counter}>{x.counter}</div>
                </div>
              </div>
            ))*/}
            </div>}
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModal(true)}
          >
            Mais Detalhes
          </button>
        </div>
      </Card>
      <TooltipGlodal />
      <Modal
        outerClassName={styles.outer}
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      >
        <Success />
      </Modal>
    </>
  );
};

export default Overview;

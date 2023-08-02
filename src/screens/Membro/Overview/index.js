import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import Modal from "../../../components/Modal";
import Success from "./Success";
import TextInput from "../../../components/TextInput";
import { Switch } from "react-router/cjs/react-router.min";
import Dropdown from "../../../components/Dropdown";

const items = [
  {
    title: "Current account balance",
    counter: "$128k",
    icon: "activity",
    color: "#B5E4CA",
    tooltip: "Small description Current account balance",
  },
  {
    title: "Available for withdrawal",
    counter: "$0.00",
    icon: "pie-chart",
    color: "#CABDFF",
    tooltip: "Small description Available for withdrawal",
  },
];

const Overview = ({ className }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [resolution, setResolution] = useState(true);

  const [optionsPlanejamento, setOptionsPlanejamento] = useState(["Doença ","Maternidade ", "Funeral "]);
  const [planejamento, setPlanejamento] = useState(optionsPlanejamento[0]);
  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Pesquisa"
        classTitle="title-blue"
      >
        <div className={styles.description}>
        <div className={styles.group}>

        
        <span className={styles.field}>
          {/*
        <TextInput
          className={styles.field}
          label="Ano"
          name="amount"
          type="text"
          tooltip="Small description"
          required
          currency="$"
          style={{width: "250px"}}
        />
      
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="Mês"
            name="minimum-amount"
            type="text"
            required
            currency="$"
            style={{width: "250px"}}
          />
       
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="Suggested amount"
            name="suggested-amount"
            type="text"
            required
            currency="$"
            style={{width: "250px"}}
          />
          */}
        
          <Dropdown
              className={styles.field1}
              label="Tipo de subsidio"
              setValue={setPlanejamento}
              options={optionsPlanejamento}
              value={planejamento} 
              style={{width: "250px"}}
            /> 
        </span>
        </div>  
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

import React, { useState } from "react";
import cn from "classnames";
import styles from "./Share.module.sass";
import Icon from "../../../../components/Icon";
import Dropdown from "../../../../components/Dropdown";
import TextInput from "../../../../components/TextInput";
import { Link } from "react-router-dom";
import Modal from "../../../../components/Modal";


const socials = [
  {
    icon: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
  {
    icon: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    icon: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
];

const ConfigurarCobranca = (data1, setData1, setVisibleModalEdit) => {
  const [value, setValue] = useState("https://ui8.net/feel-travel");
  const [optionsPlanejamento, setOptionsPlanejamento] = useState(["Temporario por um ano", " "]);
  const [planejamento, setPlanejamento] = useState(optionsPlanejamento[0]);

  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className={styles.share} style={{width: "950px"}}>
      <div className={styles.head}>
        <div className={cn("title-red", styles.title)}>Editar produto</div>
      </div>
      
       
        <div className={styles.wrapper}>
          <div className={styles.group}>
            <p className={styles.title}><b>Produto</b></p>
            <small>Planejamento Financeiro</small>
            <p className={styles.title}><b>Tipo de Cálculo</b></p>
            <small >Preço Fixo</small>
              
          </div>
          <div className={styles.group}>
            
            
            <TextInput
              className={styles.field1}
              label="Preço"
              name="amount"
              type="number"
              tooltip="Small description"
              required
              currency="$"
              style={{flex: "0 0 calc(90% - 12px)",width: "calc(40% - 12px)",margin: "0 2px 4px", display:"flex"}}
            />
            <div className={styles.field1} style={{flex: "0 0 calc(90% - 12px)",width: "calc(40% - 12px)",margin: "0 2px 4px", display:"flex"}}>
            <Dropdown
                className={styles.field1}
                label="Ciclos"
                setValue={setPlanejamento}
                options={optionsPlanejamento}
                value={planejamento}
                
              />
            </div>
            
         </div>

         <div className={styles.group}>
          <label>Desconto</label>
            <div className={styles.field1} style={{flex: "0 0 calc(90% - 12px)",width: "calc(40% - 12px) !important",margin: "0 2px 4px"}}>
            <Dropdown
                className={styles.field1}
                label="Tipo de Desconto"
                setValue={setPlanejamento}
                options={[]}
                value={planejamento}
                
              />
            </div>
            <TextInput
              className={styles.field1}
              label="Valor"
              name="amount"
              type="number"
              tooltip="Small description"
              required
              currency="$"
              style={{flex: "0 0 calc(90% - 12px)",width: "calc(40% - 12px)",margin: "0 2px 4px"}}
            />
            <div className={styles.field1} style={{flex: "0 0 calc(90% - 12px)",width: "calc(40% - 12px) !important",margin: "0 2px 4px"}}>
            <Dropdown
                className={styles.field1}
                label="Ciclos"
                setValue={setPlanejamento}
                options={[]}
                value={planejamento}
                
              />
            </div>
            
         </div>
         <div className={styles.foot} style={{margin:"10px", paddingBottom:"10px", align:"right"}}>
         
        <button className={cn("button-stroke-green")} style={{float:"right", margin:"5px"}} >Salvar produto </button>
        <button className={cn("button-stroke-red")} style={{float:"right", margin:"5px"}} >Cancelar</button>
        <br></br>
      </div>
        </div>

  </div>
  );
};

export default ConfigurarCobranca;

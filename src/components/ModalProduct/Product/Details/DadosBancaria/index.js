import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Icon from "../../../../Icon";
import ModalPreview from "../../../../ModalPreview";
import Card from "../../../../../components/Card";

import TextInput from "../../../../../components/TextInput";

import Dropdown from "../../../../../components/Dropdown";
import axios from "axios";

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  


  
  
  return (
    <Card
      className={cn(styles.card, className)}
      title="Dados da Conta Bancária"
      classTitle="title-green"   
    >
      <div className={styles.description}>
      <hr></hr> 
      <div className={styles.group}>        
        
       <TextInput
          className={styles.field}
          label="NIB"
          name="nib_conta"
          type="text"
          required
         
        />
      
      <TextInput
          className={styles.field}
          label="Nº Conta"
          name="n_conta"
          type="text"
          required
          
        />

      </div>
    
      </div>
      
    </Card>
  );
};

export default NameAndDescription;
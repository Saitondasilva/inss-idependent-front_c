import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
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
  const [content, setContent] = useState();
 

  return (
    <Card    
      className={cn(styles.card, className)}      
      title="Endereço"       
      classTitle="title-green"        
    >
      <div className={styles.description}>
      <hr></hr> 
       
      <div className={styles.group}>   
        
        
        <span className={styles.field}>
        <TextInput
          className={styles.field1}
          label="Lcalidade"
          name="morada"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          type="text"
          required
         
        /> 
       </span>
      
      
      <TextInput
          className={styles.field}
          label="Nº Porta"
          name="N_porta"
          type="text"
          required
         
        />
        <TextInput
          className={styles.field}
          label="Ponto de referencia"
          name="ponto_referencia"
          type="text"
          required
          
        />     
    
      
      
       {/*
       <TextInput
          className={styles.field}
          label="Foto"
          name="photo"
          type="file"
          tooltip="Foto"
          required
          onChange={onChangeFile}
          //value={data1.photo}
        />
        */}
       
      </div>
      
   
          
      </div>
      
      
        {
          /*
       <Editor
          state={content}
          onChange={setContent}
          classEditor={styles.editor}
          label="Sobre"
          tooltip="Descrição"
          name="descricao"
          value={data1.descricao}
          />
        */}
       
      
    </Card>
  );
};

export default NameAndDescription;

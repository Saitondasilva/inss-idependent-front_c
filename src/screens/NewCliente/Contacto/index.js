import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsGenero, setOptionsGenero] = useState([]);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState([]);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [linguagem, setLinguagem] = useState(optionsLinguagem[0]);
  const [nacionalidade, setNacionalidade] = useState(optionsNacionalidade[0]);
  const [optionsPais, setOptionsPais] = useState([]);
  const [pais, setpais] = useState(optionsPais[0]);
  const [optionsBanco, setOptionsBanco] = useState(['--Ecolhe o Banco--','BISTP','AFRILAND','ECOBANK']);
  const [banco, setbanco] = useState(optionsBanco[0]);
  const [optionsBancoID, setOptionsBancoID] = useState([1,2,3]);
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  

  return (
    <Card    
      className={cn(styles.card, className)}      
      title="Contacto"       
      classTitle="title-green"        
    >
      <div className={styles.description}>
      <hr></hr> 
       
      <div className={styles.group}>   
        
        
        <span className={styles.field}>
        <TextInput
          className={styles.field1}
          label="Telemóvel"
          name="tel"  
          mask="9 99 99 99"        
          type="tel"
          required
          onChange={onChangeData}
          value={data1.tel}
        /> 
       </span>
       <TextInput
          className={styles.field}
          label="Caixa Postal"
          name="caixa_postal"
          type="text"
          required
          onChange={onChangeData}
          value={data1.caixa_postal}
        />
      
      <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          required
          onChange={onChangeData}
          value={data1.email}
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
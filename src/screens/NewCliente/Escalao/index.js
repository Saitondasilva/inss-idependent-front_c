import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Escalao.module.sass";
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

const EscalaoDesc = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsGenero, setOptionsGenero] = useState([]);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState([]);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [linguagem, setLinguagem] = useState(optionsLinguagem[0]);
  const [nacionalidade, setNacionalidade] = useState(optionsNacionalidade[0]);
  const [optionsPais, setOptionsPais] = useState([]);
  const [pais, setpais] = useState(optionsPais[0]);
  const [optionsEscalao, setOptionsEscalao] = useState(['--Ecolhe um Esclão--','1º Escalão','2º Escalão','3º Escalão','4º Escalão','5º Escalão']);
  const [escalao, setescalao] = useState(optionsEscalao[0]);
  const [optionsBancoID, setOptionsBancoID] = useState([1,2,3]);
  const [optionsEsquema, setOptionsEsquema] = useState(['--Ecolhe um Esclão--','Esquema obrigatório','Esquema alargado']);
  const [Esquema, setEsquema] = useState(optionsEsquema[0]);
  const [optionsRegimeID, setOptionsRegimeID] = useState([1,2,3]);
 
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  function getEscalao(){
    return axios
    .get("/getEscalao")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
      }
      setOptionsEsquema(a);
      setEsquema([optionsEsquema[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {
    getEscalao()
  },[]);
  return (
    <Card    
      className={cn(styles.card, className)}      
      title="Escalao"       
      classTitle="title-green"        
    >
      <div className={styles.description}>
      <hr></hr> 
       
      <div className={styles.group}>   
        
        
      <span className={styles.field}>
        <Dropdown
          className={styles.field1}
          label="Esclão"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setescalao}
          options={optionsEscalao}
          onChange={data1.escalao=escalao}
          value={escalao}
        /> 
        </span>
  
        <span className={styles.field}>
        <Dropdown
          className={styles.field1}
          label="Regime Ogrigatório"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setEsquema}
          options={optionsEsquema}
          onChange={data1.Esquema=Esquema}
          value={Esquema}
        /> 
        </span>
      
      
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

export default EscalaoDesc;
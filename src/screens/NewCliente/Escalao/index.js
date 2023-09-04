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
  const [optionsEscalao, setOptionsEscalao] = useState([]);
  const [escalao, setEscalao] = useState(optionsEscalao[0]);
  const [escalaoID, setEscalaoID] = useState([]);
  const [optionsEsquema, setOptionsEsquema] = useState([]);
  const [esquema, setEsquema] = useState(optionsEsquema[0]);
  const [esquemaID, setEsquemaID] = useState([]);
  const [optionsPeriodo, setOptionsPeriodo] = useState(['Mensal', 'Trimestral', 'Simenstral']);
  const [periodo, setPeriodo] = useState(optionsPeriodo[0]);
 
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
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsEscalao(a);
      setEscalaoID(b)
      setEscalao([optionsEsquema[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getEsquema(){
    return axios
    .get("/getEsquema")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].esquema)
        b.push(response.data.data[i].id)
      }
      setOptionsEscalao(a);
      setEscalao([optionsEscalao[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getEsquema(){
    return axios
    .get("/getEsquema")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].esquema)
        b.push(response.data.data[i].id)
      } 
      setOptionsEsquema(a);
      setEsquemaID(b)
      setEsquema([optionsEsquema[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {
    getEscalao()
    getEsquema()
  },[]);
  
  useEffect(() => {
    var position        =  optionsEscalao.indexOf(escalao);
    data1.escalao_id   =  escalaoID[position];
  }, [escalao]);
  
  useEffect(() => {
    var position        =  optionsEsquema.indexOf(esquema);
    data1.esquema_id   =  esquemaID[position];
  }, [esquema]);

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
          setValue={setEscalao}
          options={optionsEscalao}
          onChange={data1.escalao=escalao}
          value={escalao}
        /> 
        </span>
  
        <span className={styles.field}>
        <Dropdown
          className={styles.field1}
          label="Esquema"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setEsquema}
          options={optionsEsquema}
          onChange={data1.esquema=esquema}
          value={esquema}
        /> 
        </span>

        <span className={styles.field}>
        <Dropdown
          className={styles.field1}
          label="Periodo contribuitivo"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setPeriodo}
          options={optionsPeriodo}
          onChange={data1.periodo=periodo}
          value={periodo}
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
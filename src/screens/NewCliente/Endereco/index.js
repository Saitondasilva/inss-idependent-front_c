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
  
  const [optionsBanco, setOptionsBanco] = useState(['--Ecolhe o Distrito--','Água-grande','Mé-zochi','Lobata','Cantagalo','Lembá','Caué']);
  const [banco, setbanco] = useState(optionsBanco[0]);
 // const [optionsBancoID, setOptionsBancoID] = useState([1,2,3,4,5,6,7]);
  data1.descricao=content;

  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  function getDistrito(){
    return axios
    .get("/getDistrito")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.length; i++){
        a.push(response.data[i].descricao)
      }
      setOptionsBanco(a);
      setbanco([optionsBanco[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {
    getDistrito()
    
  },[]);


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
          onChange={onChangeData}
          value={data1.nconta}
        /> 
       </span>
      
      
      <TextInput
          className={styles.field}
          label="Nº Porta"
          name="N_porta"
          type="text"
          required
          onChange={onChangeData}
          value={data1.nconta}
        />
        <TextInput
          className={styles.field}
          label="Ponto de referencia"
          name="ponto_referencia"
          type="text"
          required
          onChange={onChangeData}
          value={data1.nconta}
        />
      
        <span className={styles.field}>
        <Dropdown
          className={styles.field1}
          label="Distrito"          
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setbanco}
          options={optionsBanco}
          onChange={data1.banco=banco}
          value={banco}
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

export default NameAndDescription;

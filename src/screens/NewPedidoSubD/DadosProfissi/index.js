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
  const [optionsProfisao, setOptionsProfisao] = useState(['--profissão', 'Horticultor', 'Marcineiro', 'Pedreiro']);
  const [profisao, setProfisao] = useState(optionsProfisao[0]);
  
 
  const [search, setSearch] = useState("");
 // data1.descricao=content;



  function getprofissao(){
    return axios
    .get("/getprofisao")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].nome)
      }
      setOptionsProfisao(a);
      setProfisao([optionsProfisao[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {
    getprofissao()
  },[]);

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
      title="Observação/Notificação"       
      classTitle="title-green"        
    >
      <div className={styles.description}>
      <hr></hr> 
      <div className={styles.group}>
    
    
       <TextInput
          className={styles.field}
          label="Nome do Email *"
          name="email"
          type="number"
          required
          onChange={onChangeData}
          value={data1.email}
        /> 
             <TextInput
          className={styles.field}
          label="Nº de Móvel *"
          name="tel"
          type="number"
          required
          onChange={onChangeData}
          value={data1.tel}
        /> 
        
      </div>
       
      <Editor
          state={content}
          onChange={setContent}
          classEditor={styles.editor}
          label="Observação"
          tooltip="Descrição"
          name="descricao"
          value={data1.descricao}
          />
      
   
          
      </div>
      
      
    </Card> 
  );
};

export default NameAndDescription;

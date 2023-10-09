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
  
  const [optionsDistrito, setOptionsDistrito] = useState([]);
  const [distrito, setDistrito] = useState(optionsDistrito[0]);
  const [distritoID, setDistritoID] = useState([]);
  data1.descricao=content;

  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  function read(){
    if(data1.id>0){
      // Documento
      var position        =   distritoID.indexOf(data1.id_distrito)
      setDistrito(optionsDistrito[position])
    }
  }
  function getDistrito(){
    return axios
    .get("/getDistrit")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].nome)
        b.push(response.data.data[i].id)

      }
      setOptionsDistrito(a);
      setDistritoID(b)
      setDistrito([optionsDistrito[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }

  useEffect(() => {
    getDistrito()
  },[]);

  useEffect(() => {
    read()
  },[data1]);
  
  useEffect(() => {
    var position        =   optionsDistrito.indexOf(distrito);
    data1.id_distrito   =  distritoID[position];
  }, [distrito]);

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
          label="Lcalidade *"
          name="morada"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          type="text"
          required
          onChange={onChangeData}
          value={data1.morada}
        /> 
       </span>
      
      
      <TextInput
          className={styles.field}
          label="Nº Porta"
          name="numero_porta"
          type="text"
          required
          onChange={onChangeData}
          value={data1.numero_porta}
        />
        <TextInput
          className={styles.field}
          label="Ponto de referencia *"
          name="ponto_referencia"
          type="text"
          required
          onChange={onChangeData}
          value={data1.ponto_referencia}
        />
      
        <span className={styles.field}>
        <Dropdown
          className={styles.field1}
          label="Distrito *"          
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setDistrito}
          options={optionsDistrito}
          onChange={data1.distrito=distrito}
          value={distrito}
        /> 
        </span>

       
      </div>
      </div>
 
    </Card>
  );
};

export default NameAndDescription;

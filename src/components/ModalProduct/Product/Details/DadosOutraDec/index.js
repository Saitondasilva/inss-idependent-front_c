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
 
  const [optionsAntigoNISS, setOptionsAntigoNISS] = useState(['Sim', 'Não']);
  const [antigoNISS, setAntigoNISS] = useState(optionsAntigoNISS[0]);
  
  
 
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  function onChangeFile(e){
    let file = e.target.files
   /* data1.photo=this.state.image
    this.setState({
      photo: e.target.files[0]
  })
    console.log("FILE", this.state.image)*/
  }
 
  

  function buscarCep() {/*
     
    fetch(`http://viacep.com.br/ws/${data1.cep}/json/`, {mode: 'cors'})
     .then((res) => res.json())
     .then((data) => {
           data1.cep=data.cep 
           data1.cidade=data.localidade
           data1.estado=data.logradouro
           setData1(data1)
        
     })
     .catch(err =>{alert("Cep não existente");data1.cep="";});

    */}
  return (
    <Card
      className={cn(styles.card, className)}
      title="Outras Declarações"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>
    
       
       <span className={styles.field}>
  
       <Dropdown
          className={styles.field1}
          label="Já esteve ,alguma vez ,inscrito na segurança Social"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setAntigoNISS}
          options={optionsAntigoNISS}
          onChange={data1.antigoNISS=antigoNISS}
          value={antigoNISS}
        /> 
       </span>      
          
        { antigoNISS=="Sim"&&(
       <TextInput
          className={styles.field}
          label="Se sim  diz o nome da Entidade Empregadora"
          name="empresa_que_trabalhou"
          type="text"
          required
          onChange={onChangeData}
          value={data1.empresa_que_trabalhou}
        />)}
         { antigoNISS=="Sim"&&(
         <TextInput
          className={styles.field}
          label="Antigo NISS"
          name="antigo_niss"
          type="text"
          required
          onChange={onChangeData}
          value={data1.antigo_niss}
        />      
  
        )}
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
       
      </div>
    </Card>
  );
};

export default NameAndDescription;

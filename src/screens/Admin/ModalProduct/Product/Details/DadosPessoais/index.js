import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../../../../components/Card";

import TextInput from "../../../../../../components/TextInput";

import Dropdown from "../../../../../../components/Dropdown";
import axios from "axios";


// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1, id}) => {
  const [content, setContent] = useState();
  const [optionsGenero, setOptionsGenero] = useState([]);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [generoID, setGeneroID] = useState([]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState([]);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [estadocivilID, setEstadocivilID] = useState([]);
  
  const [optionsPais, setOptionsPais] = useState(['--Escolha um--', 'Santomense', 'estrangeiro']);
  const [pais, setPais] = useState(optionsPais[0]);
  const [paisID, setPaisID] = useState([]);
  const [optionsDocumento, setOptionsDocumento] = useState([]);

  const [optionsNivel, setOptionsNivel] = useState(['Administrador', 'Atendimento', 'Validador']);
  const [nivel, setNivel] = useState([]);
  
  const [nome, setNome] = useState();
  const [numero_documento, setNumeroDocumento] = useState();
  const [data_nasc, setDataNasc] = useState();
 
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
  
  return (
    <Card
      className={cn(styles.card, className)}
      title="Registro de Utilizador"
      classTitle="title-green"      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>

        <TextInput
          className={styles.field}
          label="Utilizador*"
          name="nome"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.tilizador}
        
        />
          <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.email}
        />
        <TextInput
          className={styles.field}
          label="Password"
          name="password"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.password}
        />
        <TextInput
          className={styles.field}
          label="Confirmar Password"
          name="repassword"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.repassword}
        />
         <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Perfil de Utilizador*"
          setValue={setNivel}
          options={optionsNivel}
          onChange={data1.nivel=nivel}
          value={nivel}
        /> </span>   
      
       </div>
 
      </div>
    </Card>
  );
};
export default NameAndDescription;

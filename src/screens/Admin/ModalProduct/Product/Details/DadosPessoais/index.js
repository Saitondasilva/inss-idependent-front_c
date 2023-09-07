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
  const [documento, setDocumento] = useState(optionsDocumento[0]);
  const [documentoID, setDocumentoID] = useState([]);
  const [nome, setNome] = useState();
  const [numero_documento, setNumeroDocumento] = useState();
  const [data_nasc, setDataNasc] = useState();
  const [nome_mae, setNomeMae] = useState();
  const [nome_pai, setNomePai] = useState();
  const [nif, setNif] = useState();
  
 
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }



  function GetAllCliente() {
    return axios
      .get("/utente/getUtenteById/"+id)
      .then((response) => {
       console.log(response.data.data)
       setNome(response.data.data.Utente.nome)
       setDataNasc(response.data.data.Utente.data_nasc)
       setNumeroDocumento(response.data.data.Utente.numero_documento)
       setNomeMae(response.data.data.Utente.nome_mae)
       setNomePai(response.data.data.Utente.nome_pai)
       setNif(response.data.data.Utente.nif)
       
       data1.id_utente=response.data.data.Utente.id
       
      })
    
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};  
  useEffect(() => {
    
  },[ id]);

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
          label="Nome *"
          name="nome"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={nome}
        
        />
          <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data_nasc}
        />
        <TextInput
          className={styles.field}
          label="Password"
          name="password"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data_nasc}
        />
        <TextInput
          className={styles.field}
          label="Confirmar Password"
          name="repassword"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data_nasc}
        />
   
      
       </div>
  
       
      </div>
    </Card>
  );
};
export default NameAndDescription;

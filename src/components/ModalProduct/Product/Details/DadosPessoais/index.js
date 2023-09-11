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

const NameAndDescription = ({ className, item}) => {
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
  
  return (
    <Card
      className={cn(styles.card, className)}
      title="Detalhes do Utente"
      classTitle="title-green"      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>
    
        <TextInput
          className={styles.field}
          label="Nº Documento"
          name="numero_documento"
          type="text"
          required
          value={numero_documento}
        />
       
        <TextInput
          className={styles.field}
          label="Nome *"
          name="nome"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={nome}
        
        />
          <TextInput
          className={styles.field}
          label="Data nascimento *"
          name="data_nasc"
          type="date"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={data_nasc}
        />
        <TextInput
          className={styles.field}
          label="Nome pai"
          name="nome_pai"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={nome_pai}
        />
        <TextInput
          className={styles.field}
          label="Nome Mãe"
          name="nome_mae"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          value={nome_mae}
 
        />
      
        <TextInput
          className={styles.field}
          label="NIF"
          name="nif"
          type="text"
          mask="999999999"
          required
          value={nif}
          write
        />      
      
       </div>
      
       
      </div>
    </Card>
  );
};
export default NameAndDescription;

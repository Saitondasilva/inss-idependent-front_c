import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import axios from "axios";

const NameAndDescription = ({ className, data2, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsSexo, setOptionsSexo] = useState(['--Sexo--', 'M', 'F']);
  const [sexo, setSexo] = useState(optionsSexo[0]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState(['--Estado Civil--','Solteiro', 'Casado', 'Viuvo']);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [optionsPais, setOptionsPais] = useState(['--País--', 'São Tomé e Príncipe']);
  const [pais, setPais] = useState(optionsPais[0]);
  const [optionsDocumento, setOptionsDocumento] = useState(['--Documento--', 'BI', 'Cédula PEsoal']);
  const [Documento, setDocum] = useState(optionsDocumento[0]);
 
 


  function onChangeData(e) {
    console.log(e)
    setData1((data2) => ({
      ...data2,
      [e.target.name]: e.target.value,
    }));
  }

 
  

  return (
    <Card
      className={cn(styles.card, className)}
      title="Identificação Do Beneficiário"
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
        
        />
       
        <TextInput
          className={styles.field}
          label="Nome *"
          name="nome"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
         
        />
          <TextInput
          className={styles.field}
          label="Data nascimento *"
          name="data_nasc"
          type="date"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
         
        />
        <TextInput
          className={styles.field}
          label="Nome pai"
          name="nome_pai"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
         
        />
        
        
        <TextInput
          className={styles.field}
          label="Nome Mãe"
          name="nome_mae"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          
          

        />
      
        <TextInput
          className={styles.field}
          label="NIF"
          mask="99.999.999"
          name="nif"
          type="text"
          required
         
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
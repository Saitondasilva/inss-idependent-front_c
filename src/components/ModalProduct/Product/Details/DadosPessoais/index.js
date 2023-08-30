import React, { useState } from "react";
import cn from "classnames";
import styles from "./NameAndDescription.module.sass";
import Icon from "../../../../Icon";
import ModalPreview from "../../../../ModalPreview";
import Card from "../../../../../components/Card";

import TextInput from "../../../../../components/TextInput";

import Dropdown from "../../../../../components/Dropdown";
import axios from "axios";



const Overview = () => {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  return (
    <Card
    className={cn(styles.card)}
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

export default Overview;

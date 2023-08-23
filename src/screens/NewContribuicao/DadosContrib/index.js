import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./DadosContri.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import Checkbox from "../../../components/Checkbox";
import axios from "axios";

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, handleSubmit, data1, setData1 }) => {
  const [content, setContent] = useState();
 
 
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  
  function buscarNIF() {     
    return axios
    .get("/utente/getUtenteByNIF/"+data1.nif)
     .then((data) => {

           data1.nome=data.data.data.Utente.nome 
             
           setData1(data1)
        
     })
     .catch(err =>{});

}
  return (
    <Card
      className={cn(styles.card, className)}
      title="Dados do Contribuinte"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>
      
          
      <TextInput
          className={styles.field}
          label="Nome do Beneficiaário"
          name="nome"
          type="text"
          required
         
          value={data1.nome}
         
        />

        <TextInput
          className={styles.field}
          label="Numero de Beneficiário"
          name=""
          type="text"
          required
          onChange={onChangeData}
          value={data1.bi4}
        />
       
       <TextInput
          className={styles.field}
          label="NIF"
          name="nif2"
          type="text"
          required
          onClick={buscarNIF()}
          
          value={data1.nif}
        />
      
      <TextInput
          className={styles.field}
          label="Nascimento"
          name=""
          type="date"
          required
          onChange={onChangeData}
          value={data1.bi3}
        />
          
          
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

/*<div className="Acessible">
              <label htmlFor="Acessible">
                Acessible
              <MultiSelect
                  options={[
                    { label: "Whatsapp ", value: "Whatsapp" },
                    { label: "Botim ", value: "Botim" },
                    { label: "Telegram ", value: "Telegram" }
                  ]}
                  value={this.state.value}
                  onChange={(value) => this.setState({ value })}
                />
              </label>
            </div>
           */
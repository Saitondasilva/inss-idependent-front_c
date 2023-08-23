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

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [nome, setNome] = useState();
  const [dataNasc, setDataNasc] = useState();
 
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

/*  
  useEffect(() => {
    getUtente();
  },[data1.nif]);
*/

function getUtenteByNif(){
  console.log("GetUtent ",data1.nif)
  return axios
  .get("/utente/getUtenteByNIF/"+data1.nif)
  .then((response) => {
    if(response.data.data.Utente.length > 0){
      console.log("Entreuii ",response.data.data.Utente[0].nome)
      setNome(response.data.data.Utente[0].nome)
      setDataNasc(response.data.data.Utente[0].data_nasc)
      data1.id_utente=response.data.data.Utente[0].id
     setData1(data1)
    }else{
      console.log("SAI ",data1.nif)
      setNome("")
      setDataNasc("")
     setData1(data1)
    }
  })
  .catch((err) => {
    data1.nome=""
      data1.data_nasc=""
     setData1(data1)
    console.log("Error", err);
    return err.response;
  });
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
          label="NIF"
          name="nif"
          type="text"
          icon="search"
          required
          onChange={onChangeData}
          onKeyUp={getUtenteByNif}
          value={data1.nif}
        />
          
        <TextInput
          className={styles.field}
          label="Numero de Beneficiário"
          name="numero"
          type="text"
          required
          onChange={onChangeData}
          value={data1.numero}
        />
        </div>
   
      <div className={styles.group}>
      <TextInput
          className={styles.field}
          label="Nome do Beneficiaário"
          name="nome"
          type="text"
          required
          onChange={onChangeData}
          value={nome}
        />
       
      <TextInput
          className={styles.field}
          label="Data Nascimento"
          name="data_nasc"
          type="text"
          required
          onChange={onChangeData}
          value={dataNasc}
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
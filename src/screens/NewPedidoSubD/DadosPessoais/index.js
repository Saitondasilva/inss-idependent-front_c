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
import Search from "../../AnaliseProgresso/Search";

const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, handleSubmit, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [nome, setNome] = useState();
  const [nome_pai, setPai] = useState();
  const [numero, setNumero] = useState();
  const [dataNasc, setDataNasc] = useState();
  const [valorPrestacaoMensal, setValorPrestacaoMensal] = useState();
  const [ultimaContribuicao, setUltimaContribuicao] = useState();
 
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
  data1.vistoDetalhe=false;
  return axios
  .get("/utente/getUtenteByNIF/"+data1.nif)
  .then((response) => {
    if(response.data.data.Utente.length > 0){
      setNome(response.data.data.Utente[0].nome)
      setPai(response.data.data.Utente[0].nome_pai)
      data1.numero=response.data.data.Utente[0].codigo
      setDataNasc(response.data.data.Utente[0].data_nasc)
      data1.id_utente=response.data.data.Utente[0].id
    }else{
      cleanContrib()
    
    }
  })
  .catch((err) => {
    cleanContrib()
    console.log("Error", err);
    return err.response;
  });
}

function getUtenteByCode(){
  data1.vistoDetalhe=false;
  return axios
  .get("/utente/getUtenteByCode/"+data1.numero)
  .then((response) => {
    console.log("UTENTE",response.data.data.Utente)
    if(response.data.data.Utente.length > 0){
      setNome(response.data.data.Utente[0].nome)
      setPai(response.data.data.Utente[0].nome_pai)
      data1.nif=response.data.data.Utente[0].nif
      setDataNasc(response.data.data.Utente[0].data_nasc)
      data1.id_utente=response.data.data.Utente[0].id
    }else{
      cleanContrib()
    }
  })
  .catch((err) => {
    cleanContrib()
    console.log("Error", err);
    return err.response;
  });
}
function cleanContrib(){
  setNome("")
  setDataNasc("")
  setValorPrestacaoMensal("")
  setUltimaContribuicao("")
  data1.numero=""
  data1.id_utente=null
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
          label="NIF *"
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
          label="Numero de Beneficiário *"
          name="numero"
          type="text"
          icon="search"
          required
          onChange={onChangeData}
          onKeyUp={getUtenteByCode}
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
          readOnly
        />
       
      <TextInput
          className={styles.field}
          label="Data Nascimento"
          name="data_nasc"
          type="text"
          required
          onChange={onChangeData}
          value={dataNasc}
          readOnly
        />
      </div>
   
      <div className={styles.group}>
      <TextInput
          className={styles.field}
          label="Nome pai"
          name="nome_pai"
          type="text"
          required
          onChange={onChangeData}
          value={nome_pai}
          readOnly
        />
       
      <TextInput
          className={styles.field}
          label="Genero"
          name="ultimo_pagamento"
          type="text"
          required
          value={ultimaContribuicao}
          readOnly
        />

      <TextInput
          className={styles.field}
          label="Genero"
          name="ultimo_pagamento"
          type="text"
          required
          value={ultimaContribuicao}
          readOnly
        />
         <TextInput
          className={styles.field}
          label="Genero"
          name="ultimo_pagamento"
          type="text"
          required
          value={ultimaContribuicao}
          readOnly
        /> 
        <TextInput
        className={styles.field}
        label="Genero"
        name="ultimo_pagamento"
        type="text"
        required
        value={ultimaContribuicao}
        readOnly
      />
      </div>

      </div>
    </Card>
  );
};

export default NameAndDescription;

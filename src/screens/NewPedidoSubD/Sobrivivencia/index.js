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
import DadosAnexo from "./../DadosAnexo";


const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, handleSubmit, data1, setData1, data, setData }) => {
  const [content, setContent] = useState();
  const [nome, setNome] = useState();
  const [nome_pai, setPai] = useState();
  const [numero, setNumero] = useState();
  const [dataNasc, setDataNasc] = useState();
  const [valorPrestacaoMensal, setValorPrestacaoMensal] = useState();
  const [ultimaContribuicao, setUltimaContribuicao] = useState();
  const [optionsBanco, setOptionsBanco] = useState(['--Banco--','AFRILAND','ECOBANK','BGFI']);
  const [banco, setBanco] = useState(optionsBanco[0]);
  const [bancoID, setBancoID] = useState([]);
 
  data1.descricao=content;
  
  function read(){
    if(data1.id>0){
      // Banco
      var position        =   bancoID.indexOf(data1.id_banco)
      setBanco(optionsBanco[position])
    }
  }
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
      data1.codigo=response.data.data.Utente[0].codigo
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
  .get("/utente/getUtenteByCode/"+data1.codigo)
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
  data1.codigo=""
  data1.id_utente=null
}

function getBanco(){
  return axios
  .get("/getBanco")
  .then((response) => {
     var a = new Array();
     var b = new Array();
    for(var i=0; i<response.data.data.length; i++){
      a.push(response.data.data[i].nome)
      b.push(response.data.data[i].id)
    }
    setOptionsBanco(a);
    setBancoID(b);
    setBanco([optionsBanco[0]])
  })
  .catch((err) => {
    console.log("Error", err);
    return err.response;
  });
}
useEffect(() => {   
  getBanco()
 },[]);
 useEffect(() => {
   var position        =   optionsBanco.indexOf(banco);
       data1.banco_id=bancoID[position];
 }, [banco]);

 useEffect(() => {
   read()
 }, [data1]);


  return (
    <Card
      className={cn(styles.card, className)}
      title="Pensão de Sobrivivencia"
      classTitle="title-green"      
    >
      
      

<h3 className={styles.title} >Dados Bancários</h3><hr></hr>
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
          name="codigo"
          type="text"
          icon="search"
          required
          onChange={onChangeData}
          onKeyUp={getUtenteByCode}
          value={data1.codigo}
          
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

      

      </div><br></br>

      <h2 className={styles.title} >Dados Bancários</h2><hr></hr>
      
      <div className={styles.group}>        
        
        <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Banco "
          name="banco"
          setValue={setBanco}
          options={optionsBanco}
          onChange={data1.banco=banco}
          value={banco}
        /> 
       </span>
       <TextInput
          className={styles.field}
          label="NIB "
          name="nib"
          type="text"
          mask="99999999999999999999"
          required
          onChange={onChangeData}
          value={data1.nib}
        />
      
      <TextInput
          className={styles.field}
          label="IBAN "
          name="iban"
          type="text"
          required
          onChange={onChangeData}
          value={data1.iban}
        />
        
           <TextInput
          className={styles.field}
          label="Nº Conta "
          name="n_conta"
          type="number"
          required
          onChange={onChangeData}
          value={data1.n_conta}
        />
     
          
      </div>
      
     
  
      <br></br>

<h2 className={styles.title} >Periodo de Baixa</h2><hr></hr>
      
       
      <div className={styles.group}>   
        
        
      <TextInput
          className={styles.field}
          label="Data de Inicio*"
          name="data_inicio"
          type="date"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.data_inicio}
        />
  
  <TextInput
          className={styles.field}
          label="Numero de dias*"
          name="n_dias"
          type="number"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.n_dias}
        />
   
      </div>


    { /* <DadosAnexo className={styles.card} data1={data1} setData1={setData1} data={data} setData={setData}/>*/}
     

    </Card>

  );
};

export default NameAndDescription;

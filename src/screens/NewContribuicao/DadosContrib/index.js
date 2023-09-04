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
  const [nome, setNome] = useState();
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
      data1.numero=response.data.data.Utente[0].codigo
      setDataNasc(response.data.data.Utente[0].data_nasc)
      data1.id_utente=response.data.data.Utente[0].id
      CalcularContribuicaoMensal();
      calcularMesesEmDivida();
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
      data1.nif=response.data.data.Utente[0].nif
      setDataNasc(response.data.data.Utente[0].data_nasc)
      data1.id_utente=response.data.data.Utente[0].id
     CalcularContribuicaoMensal();
     calcularMesesEmDivida();
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
function CalcularContribuicaoMensal(){
  return axios
  .get("/utente/calcularValorContribuicaoMensal/"+data1.id_utente)
  .then((response) => {
    data1.valorPrestacaoMensal=response.data.data.valor;
    setValorPrestacaoMensal(response.data.data.valor)
  })
  .catch((err) => {
    setValorPrestacaoMensal("")
    console.log("Error", err);
    return err.response;
  });
}
function calcularMesesEmDivida(){
  return axios
  .get("/utente/calcularMesesEmDivida/"+data1.id_utente)
  .then((response) => {
   if (typeof response.data.data.UltimoMesPago === 'undefined' & typeof response.data.data.UltimoAnoPago === 'undefined'){
      data1.TemContribuicao=response.data.data.TemContribuicao;
      data1.SomaPagUltimoMes=0;
      data1.UltimoDiaPago=response.data.data.DiaRegistro
      data1.UltimoAnoPago=response.data.data.AnoRegistro
      data1.UltimoMesPago=response.data.data.MesRegistro
      
      setUltimaContribuicao("Registrado em: "+response.data.data.DiaRegistro+'/'+response.data.data.MesRegistro+'/'+response.data.data.AnoRegistro)
    
    }else {
      data1.TemContribuicao=response.data.data.TemContribuicao;
      data1.SomaPagUltimoMes=response.data.data.SomaPagUltimoMes;
      data1.UltimoAnoPago=response.data.data.UltimoAnoPago
      data1.UltimoMesPago=response.data.data.UltimoMesPago
      
      setUltimaContribuicao('Pago: '+response.data.data.SomaPagUltimoMes+' Dbs, para '+response.data.data.UltimoMesPago+'/'+response.data.data.UltimoAnoPago)
      
    }
  })
  .catch((err) => {
    setUltimaContribuicao("")
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
          label="Valor de Prestação Mensal"
          name="valor_prestacao_mensal"
          type="text"
          required
          value={valorPrestacaoMensal}
          readOnly
        />
       
      <TextInput
          className={styles.field}
          label="Ultima Contribuição"
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
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

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsForma, setOptionsForma] = useState(['Transferencia Bancária', 'Deposito']);
  const [forma, setForma] = useState(optionsForma[0]);
 
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

  function buscarCep() {
     
    fetch(`http://viacep.com.br/ws/${data1.cep}/json/`, {mode: 'cors'})
     .then((res) => res.json())
     .then((data) => {
           data1.cep=data.cep 
           data1.cidade=data.localidade
           data1.estado=data.logradouro
           setData1(data1)
        
     })
     .catch(err =>{alert("Cep não existente");data1.cep="";});

}
  return (
    <Card
      className={cn(styles.card, className)}
      title="Transação"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>

  <span className={styles.field}>
  
  <Dropdown
     className={styles.field1}
     label="Forma de pagamento Contribuição"
     tooltip="Maximum 100 characters. No HTML or emoji allowed"
     setValue={setForma}
     options={optionsForma}
     onChange={data1.forma_transacao=forma}
     value={forma}
   /> 
  </span>
        
   <TextInput
          className={styles.field}
          label="Data de Transação"
          name="data_transacao"
          type="date"
          required
          onChange={onChangeData}
          value={data1.data_transacao}
        />
 <TextInput
          className={styles.field}
          label="Codigo de Transação"
          name="codigo_transacao"
          type="text"
          required
          onChange={onChangeData}
          value={data1.codigo_transacao}
        />
      <TextInput
          className={styles.field}
          label="Valor Total Pago"
          name="valor_total"
          type="text"
          required
          onChange={onChangeData}
          value={data1.valor_total}
        />
       
      </div>
             
      </div>
    </Card>
  );
};

export default NameAndDescription;
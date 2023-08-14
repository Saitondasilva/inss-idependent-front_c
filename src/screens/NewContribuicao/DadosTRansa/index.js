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
  const [optionsGenero, setOptionsGenero] = useState(['--Documento--', 'BI', 'Cédula Pessoal', 'Cartão Estrangeiro']);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState(['--Escolha e --','Solteiro', 'Casado', 'Viuvo']);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [linguagem, setLinguagem] = useState(optionsLinguagem[0]);
  const [nacionalidade, setNacionalidade] = useState(optionsNacionalidade[0]);
  const [optionsPais, setOptionsPais] = useState([]);
  const [pais, setpais] = useState(optionsPais[0]);
  const [optionsDocumento, setOptionsDocumento] = useState(['--Escolha um--', 'BI', 'Cédula PEsoal', 'Cartão estrangeiro']);
  const [Documento, setDocum] = useState(optionsPais[0]);
 
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
  function getGenero(){
    return axios
    .get("/getGenero")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
      }
      setOptionsGenero(a);
      setGenero([optionsGenero[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getEstadoCivil(){
    return axios
    .get("/getEstadoCivil")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
      }
      setOptionsEstadocivil(a);
      setEstadocivil([optionsEstadocivil[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getPais(){
    return axios
    .get("/country")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.countries.length; i++){
        a.push(response.data.data.countries[i].name)
      }
      console.log(a)
      setOptionsPais(a);
      setpais([optionsPais[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {
    getGenero()
    getEstadoCivil()
    getPais()
  },[]);

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
     label="Ano Contribuição"
     tooltip="Maximum 100 characters. No HTML or emoji allowed"
     setValue={setGenero}
     options={optionsGenero}
     onChange={data1.banco=genero}
     value={genero}
   /> 
  </span>



      <span className={styles.field}>
  
  <Dropdown
     className={styles.field1}
     label="Forma de pagamento Contribuição"
     tooltip="Maximum 100 characters. No HTML or emoji allowed"
     setValue={setGenero}
     options={optionsGenero}
     onChange={data1.banco=genero}
     value={genero}
   /> 
  </span>

  <span className={styles.field}>
  <Dropdown
     className={styles.field1}
     label="Tipo de Moeda"
     tooltip="Maximum 100 characters. No HTML or emoji allowed"
     setValue={setGenero}
     options={optionsGenero}
     onChange={data1.banco=genero}
     value={genero}
   /> 
  </span>
        
               
     <span className={styles.field}>
    <Dropdown
     className={styles.field1}
     label="Periodo de Contribuição"
     tooltip="Maximum 100 characters. No HTML or emoji allowed"
     setValue={setGenero}
     options={optionsGenero}
     onChange={data1.banco=genero}
     value={genero}
   /> 
     </span>
      
    <TextInput
          className={styles.field}
          label="Data de Transação"
          name="bi"
          type="date"
          required
          onChange={onChangeData}
          value={data1.bi}
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
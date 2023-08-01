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
  const [optionsGenero, setOptionsGenero] = useState(['--Sexo', 'Masculino', 'Feminino']);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState(['--Escolha e --','Solteiro', 'Casado', 'Viuvo']);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [linguagem, setLinguagem] = useState(optionsLinguagem[0]);
  const [nacionalidade, setNacionalidade] = useState(optionsNacionalidade[0]);
  const [optionsPais, setOptionsPais] = useState(['--Escolha um--', 'Santomense', 'estrangeiro']);
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
      title="Identificação Do Agregado"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>
      
      <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Tipo Documento"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setDocum}
          options={optionsDocumento}
          onChange={data1.Documento=Documento}
          value={Documento}
        /> </span>
        <TextInput
          className={styles.field}
          label="Nº Documento"
          name="bi"
          type="text"
          required
          onChange={onChangeData}
          value={data1.bi}
        />
       
        <TextInput
          className={styles.field}
          label="Nome *"
          name="apelido"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.apelido}
        />
          <TextInput
          className={styles.field}
          label="Data nascimento *"
          name="data_nasc"
          type="date"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.data_nasc}
        />
        <TextInput
          className={styles.field}
          label="Nome pai"
          name="Pai"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.email}
        />
        
        
        <TextInput
          className={styles.field}
          label="Nome Mãe"
          name="mae"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.contacto}
        />
      
        <TextInput
          className={styles.field}
          label="NIF"
          mask="999.999.999-99"
          name="cpf"
          type="text"
          required
          onChange={onChangeData}
          value={data1.cpf}
        />
  
        <TextInput
          className={styles.field}
          label="Profissão"
          name="profissao"
          type="text"
          required
          onChange={onChangeData}
          value={data1.profissao}
        />
      
       
       <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Gênero"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setGenero}
          options={optionsGenero}
          onChange={data1.genero=genero}
          value={genero}
        /> 
       </span>
       <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Estado civil"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setEstadocivil}
          options={optionsEstadocivil}
          onChange={data1.estadocivil=estadocivil}
          value={estadocivil}
        /> 
       </span>
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
          <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Nacionalidade"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setOptionsPais}
          options={optionsPais}
          onChange={data1.pais=pais}
          value={pais}
        /> 
       </span>       
  
       
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

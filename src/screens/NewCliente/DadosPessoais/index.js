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

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsSexo, setOptionsSexo] = useState(['--Sexo--', 'M', 'F']);
  const [sexo, setSexo] = useState(optionsSexo[0]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState(['--Estado Civil--','Solteiro', 'Casado', 'Viuvo']);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [optionsPais, setOptionsPais] = useState(['--País--', 'São Tomé e Príncipe']);
  const [pais, setPais] = useState(optionsPais[0]);
  const [optionsDocumento, setOptionsDocumento] = useState(['--Documento--', 'BI', 'Cédula PEsoal']);
  const [Documento, setDocum] = useState(optionsDocumento[0]);
 
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
      setOptionsSexo(a);
      setSexo([optionsSexo[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getTipoDocumentoUtente(){
    return axios
    .get("/getTipoDocumentoUtente")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
      }
      setOptionsDocumento(a);
      setDocum([optionsDocumento[0]])
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
        a.push(response.data.data.countries[i].nome)
      }
      console.log(a)
      setOptionsPais(a);
      setPais([optionsPais[0]])
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
    getTipoDocumentoUtente()
  },[]);

  function buscarCep() {/*
     
    fetch(`http://viacep.com.br/ws/${data1.cep}/json/`, {mode: 'cors'})
     .then((res) => res.json())
     .then((data) => {
           data1.cep=data.cep 
           data1.cidade=data.localidade
           data1.estado=data.logradouro
           setData1(data1)
        
     })
     .catch(err =>{alert("Cep não existente");data1.cep="";});
     function getPais(){
    return axios
    .get("/country")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.countries.length; i++){
        a.push(response.data.data.countries[i].nome)
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

    */}
  return (
    <Card
      className={cn(styles.card, className)}
      title="Identificação Do Beneficiário"
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
          name="numero_documento"
          type="text"
          required
          onChange={onChangeData}
          value={data1.numero_documento}
        />
       
        <TextInput
          className={styles.field}
          label="Nome *"
          name="nome"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.nome}
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
          name="nome_pai"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.nome_pai}
        />
        
        
        <TextInput
          className={styles.field}
          label="Nome Mãe"
          name="nome_mae"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.nome_mae}
          

        />
      
        <TextInput
          className={styles.field}
          label="NIF"
          mask="99.999.999"
          name="nif"
          type="text"
          required
          onChange={onChangeData}
          value={data1.nif}
        />      
       
       <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Gênero"             
          setValue={setSexo}
          options={optionsSexo}
          onChange={data1.sexo=sexo}
          value={sexo}
        /> 
       </span>
       <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Estado civil"         
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
          setValue={setPais}
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

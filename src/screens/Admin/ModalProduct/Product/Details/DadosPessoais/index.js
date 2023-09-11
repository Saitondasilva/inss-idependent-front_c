import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../../../../components/Card";

import TextInput from "../../../../../../components/TextInput";

import Dropdown from "../../../../../../components/Dropdown";
import axios from "axios";


// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1, id}) => {
  const [content, setContent] = useState();
  const [optionsGenero, setOptionsGenero] = useState([]);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [generoID, setGeneroID] = useState([]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState([]);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [estadocivilID, setEstadocivilID] = useState([]);
  
  const [optionsPais, setOptionsPais] = useState(['--Escolha um--', 'Santomense', 'estrangeiro']);
  const [pais, setPais] = useState(optionsPais[0]);
  const [paisID, setPaisID] = useState([]);
  const [optionsDocumento, setOptionsDocumento] = useState([]);
  const [documento, setDocumento] = useState(optionsDocumento[0]);
  const [documentoID, setDocumentoID] = useState([]);
  const [nome, setNome] = useState();
  const [numero_documento, setNumeroDocumento] = useState();
  const [data_nasc, setDataNasc] = useState();
  const [nome_mae, setNomeMae] = useState();
  const [nome_pai, setNomePai] = useState();
  const [nif, setNif] = useState();
  
 
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    var position        =   optionsGenero.indexOf(genero);
        data1.sexo_id   =   generoID[position];
  }, [genero]);

  useEffect(() => {
    var position              =   optionsEstadocivil.indexOf(estadocivil);
        data1.estadocivil_id  =   estadocivilID[position];
  }, [estadocivil]);

  useEffect(() => {
    var position        =   optionsPais.indexOf(pais);
        data1.pais_id   =   paisID[position];
  }, [pais]);

  useEffect(() => {
    var position            =   optionsDocumento.indexOf(documento);
        data1.documento_id  =   documentoID[position];
  }, [documento]);
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
      var a =new Array();
      var b =new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsGenero(a);
      setGenero([optionsGenero[0]])
      setGeneroID(b);
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
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsEstadocivil(a);
      setEstadocivilID(b);
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
       var b = new Array();
      for(var i=0; i<response.data.data.countries.length; i++){
        a.push(response.data.data.countries[i].nome)
        b.push(response.data.data.countries[i].id)
      }
      setOptionsPais(a);
      setPaisID(b);
      setPais([optionsPais[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getTipoDoc(){
    return axios
    .get("/getTipoDocumentoUtente")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsDocumento(a);
      setDocumentoID(b);
      setDocumento([optionsDocumento[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }


  function GetAllCliente() {
    return axios
      .get("/utente/getUtenteById/"+id)
      .then((response) => {
       console.log(response.data.data)
       setNome(response.data.data.Utente.nome)
       setDataNasc(response.data.data.Utente.data_nasc)
       setNumeroDocumento(response.data.data.Utente.numero_documento)
       setNomeMae(response.data.data.Utente.nome_mae)
       setNomePai(response.data.data.Utente.nome_pai)
       setNif(response.data.data.Utente.nif)
       
       data1.id_utente=response.data.data.Utente.id
       
      })
    
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};  
  useEffect(() => {
    
  },[ id]);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Registro de Utilizador"
      classTitle="title-green"      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>
            
     
        
        <TextInput
          className={styles.field}
          label="Nome *"
          name="nome"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={nome}
        
        />
          <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data_nasc}
        />
        <TextInput
          className={styles.field}
          label="Password"
          name="password"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data_nasc}
        />
        <TextInput
          className={styles.field}
          label="Confirmar Password"
          name="repassword"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data_nasc}
        />
   
      
       </div>
  
       
      </div>
    </Card>
  );
};
export default NameAndDescription;

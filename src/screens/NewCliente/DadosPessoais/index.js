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
  const [optionsGenero, setOptionsGenero] = useState([]);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [generoID, setGeneroID] = useState([]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState([]);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [estadocivilID, setEstadocivilID] = useState([]);
  const [nacionalidade, setNacionalidade] = useState(optionsNacionalidade[0]);
  const [optionsPais, setOptionsPais] = useState(['--Escolha um--', 'Santomense', 'estrangeiro']);
  const [pais, setPais] = useState(optionsPais[0]);
  const [paisID, setPaisID] = useState([]);
  const [optionsDocumento, setOptionsDocumento] = useState([]);
  const [documento, setDocumento] = useState(optionsDocumento[0]);
  const [documentoID, setDocumentoID] = useState([]);
 
  data1.descricao=content;
  
function read(){
  if(data1.id>0){
    // Documento
    var position        =   documentoID.indexOf(data1.id_tipo_documento)
    setDocumento(optionsDocumento[position])
    //Estado Civil
    var position1        =   estadocivilID.indexOf(data1.id_estado_civil)
    setEstadocivil(optionsEstadocivil[position1])
    //Genero
    var position2        =   generoID.indexOf(data1.id_sexo)
    setGenero(optionsGenero[position2])
    //Nacionalidade
    var position3        =   paisID.indexOf(data1.id_nacionalidade)
    setPais(optionsPais[position3])
  }
}

  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    var position        =   optionsGenero.indexOf(genero);
        data1.id_sexo   =   generoID[position];
  }, [genero]);

  useEffect(() => {
    var position        =   optionsEstadocivil.indexOf(estadocivil);
        data1.id_estado_civil  =   estadocivilID[position];
  }, [estadocivil]);

  useEffect(() => {
    var position        =   optionsPais.indexOf(pais);
        data1.pais_id  =   paisID[position];
  }, [pais]);

  useEffect(() => {
    var position        =   optionsDocumento.indexOf(documento);
        data1.id_tipo_documento  =   documentoID[position];
  }, [documento]);

  useEffect(() => {
    read()
  }, [data1]);
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
      setGeneroID(b);
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
  useEffect(() => {
    getGenero()
    getEstadoCivil()
    getPais()
    getTipoDoc()
    
  },[]);


  return (
    <Card
      className={cn(styles.card, className)}
      title="Identificação Do Beneficiário"
      classTitle="title-green"      
    >
      
      <div className={styles.description}>
        
      <hr></hr>
      <button
          className={cn(styles.head)}
          onClick={() => read()}
        >
          <Icon name="more-horizontal" size="24" />
        </button>
      <div className={styles.group}>
      
      <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Tipo Documento *"
          setValue={setDocumento}
          options={optionsDocumento}
          onChange={data1.tipo_documento=documento}
          value={documento}
        /> </span>
        <TextInput
          className={styles.field}
          label="Nº Documento *"
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
          label="Nome pai *"
          name="nome_pai"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.nome_pai}
        />

        <TextInput
          className={styles.field}
          label="Nome Mãe *"
          name="nome_mae"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.nome_mae}
 
        />
      
        <TextInput
          className={styles.field}
          label="NIF *"
          name="nif"
          type="text"
          mask="999999999"
          required
          onChange={onChangeData}
          value={data1.nif}
        />      
       
       <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Gênero *"  
          name="genero"        
          setValue={setGenero}
          options={optionsGenero}
          onChange={data1.sexo=genero}
          value={genero}
        /> 
       </span>
       <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Estado civil *"
          name="estado_civil"
          setValue={setEstadocivil}
          options={optionsEstadocivil}
          onChange={data1.estadocivil=estadocivil}
          value={estadocivil}
        /> 
       </span>
      
          <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Nacionalidade *"
          name="pais"
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

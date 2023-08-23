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
  const [optionsDocAnexo, setOptionsDocAnexo] = useState(['--Escolha um--', 'BI', 'Certidão', 'Cartão estrangeiro']);
  const [docAnexo, setDocAnexo] = useState(optionsDocAnexo[0]);
 
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  function getDocAnexo(){
    return axios
    .get("/getDocAnexo")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].nome)
      }
      setOptionsDocAnexo(a);
      setDocAnexo([optionsDocAnexo[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function onChangeFile(e){/*
    let file = e.target.files
   /* data1.photo=this.state.image
    this.setState({
      photo: e.target.files[0]
  })
    console.log("FILE", this.state.image)*/
}
  

  {/*function buscarCep() {
     
    fetch(`http://viacep.com.br/ws/${data1.cep}/json/`, {mode: 'cors'})
     .then((res) => res.json())
     .then((data) => {
           data1.cep=data.cep 
           data1.cidade=data.localidade
           data1.estado=data.logradouro
           setData1(data1)
        
     })
     .catch(err =>{alert("Cep não existente");data1.cep="";});

}*/}

function SaveFile(params) {
  
  
}

useEffect(() => {
  getDocAnexo()
},[]);
  return (
    <Card
      className={cn(styles.card, className)}
      title="Anexo"
      classTitle="title-green"
    >   
      
      <div className={styles.description}>
      <hr></hr>
      <button onClick={SaveFile} className={styles.field1}  >ADD</button>
      <div className={styles.group}>       
       
       <span className={styles.field}>
  
       <Dropdown
          className={styles.field1}
          label="Documento Anexo"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setDocAnexo}
          options={optionsDocAnexo}
          onChange={data1.docAnexo=docAnexo}
          value={docAnexo}
        /> 
       </span>

       <TextInput
          className={styles.field}
          label="Anexo"
          name="Documento_anexo"
          type="file"
          tooltip="Foto"
          required
          onChange={onChangeData}
          value={data1.profissao}
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

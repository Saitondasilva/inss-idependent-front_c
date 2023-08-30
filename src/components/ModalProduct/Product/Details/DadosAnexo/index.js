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
  const [userData, setuserData] = useState({});
  const [file, setFile] = useState([0])
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
  function onChangeFile(e){
    setFile(e.target.files[0])
    console.log(e.target.files[0])

}
  

function SaveFile() {
  
  var data={  
    
    photo: data1.photo,
  }
  
  console.log("Data",data)
  return axios
    .post("/utente/register",data,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      alert("Registro com sucesso!");
    
      //clean();
      console.log(response.data.data)
    })
    
    
};



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
          label="Foto"
          name="photo"
          type="file"
          tooltip="Foto"
          required
          onChange={onChangeFile}
          value={data1.photo}
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

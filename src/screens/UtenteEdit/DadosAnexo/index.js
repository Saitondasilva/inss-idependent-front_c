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
import Panel from "./Panel";

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsDocAnexo, setOptionsDocAnexo] = useState(['--Escolha um--', 'BI', 'NIB', 'NIF','Passaport', 'Certidão', 'Cartão Estrangeiro', 'Cartão Residência',  'Licença de Actividade','Outro']);
  const [docAnexo, setDocAnexo] = useState(optionsDocAnexo[0]);
  const [userData, setuserData] = useState({});
  const [data,setData]=useState([])
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState(""); 
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

  function validateForm(){

  
    if(!data1.anexo || data1.anexo===""){
      setSmsError("Por favor seleciona seleciona o anexo")
      return false;
    }
    return true;
  }

const handleFileChange = (event) => {
  data1.anexo=event.target.files[0];
};

function SaveFile() {
  setLoader(true)
  if(!validateForm()){setLoader(false); return false;}
   const formData = new FormData();
    
      formData.append('anexo', data1.anexo);      
  
      var data3={
   
        tabela:'Utente',
        file: data1.anexo,   
  }  
  return axios
    .post("/sendanexo",data3,{
      headers: { Authorization: `Bearer ${userData.token}`,'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      setSmsSuccess("Anexo Salvo!");
      setSmsError("");
      setLoader(false)
      console.log(response.data.data)
    })
    .catch((err) => {
      setLoader(false);
      setSmsSuccess("");
      setSmsError(err.response.data.message);
      console.log("Error", err);
      return err.response;
    });
    
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
          setValue={setDocAnexo}
          options={optionsDocAnexo}
          onChange={data1.tipo_doc=docAnexo}
          value={docAnexo}
        /> 
       </span>

       <TextInput
          className={styles.field}
          label="Anexo"
          name="anexo"
          type="file"    
          onChange={handleFileChange}
          required
        />
       
      </div>
      
        <Panel
        
        SavePagarContribuicao={SaveFile}
        smsError={smsError}
        smsSucess={smsSucess}
        loader={loader}
        />
      </div>
    </Card>
    
  );
};

export default NameAndDescription;

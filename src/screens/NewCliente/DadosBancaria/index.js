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
  const [optionsBanco, setOptionsBanco] = useState(['--Banco--','AFRILAND','ECOBANK','BGFI']);
  const [banco, setBanco] = useState(optionsBanco[0]);
  const [bancoID, setBancoID] = useState([]);
  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  
  function read(){
    if(data1.id>0){
      // Banco
      var position        =   bancoID.indexOf(data1.id_banco)
      setBanco(optionsBanco[position])
    }
  }

  function getBanco(){
    return axios
    .get("/getBanco")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].nome)
        b.push(response.data.data[i].id)
      }
      setOptionsBanco(a);
      setBancoID(b);
      setBanco([optionsBanco[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {   
   getBanco()
  },[]);
  useEffect(() => {
    var position        =   optionsBanco.indexOf(banco);
        data1.banco_id=bancoID[position];
  }, [banco]);

  useEffect(() => {
    read()
  }, [data1]);
  return (
    <Card
      className={cn(styles.card, className)}
      title="Dados da Conta Bancária"
      classTitle="title-green"   
    >
      <div className={styles.description}>
      <hr></hr> 
      <div className={styles.group}>        
        
        <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Banco "
          name="banco"
          setValue={setBanco}
          options={optionsBanco}
          onChange={data1.banco=banco}
          value={banco}
        /> 
       </span>
       <TextInput
          className={styles.field}
          label="NIB "
          name="nib_conta"
          type="text"
          mask="99999999999999999999"
          required
          onChange={onChangeData}
          value={data1.nib_conta}
        />
      
      <TextInput
          className={styles.field}
          label="Nº Conta "
          name="n_conta"
          type="number"
          required
          onChange={onChangeData}
          value={data1.n_conta}
        />
     
       
      </div>
    
        
          
      </div>
      
     
    </Card>
  );
};

export default NameAndDescription;
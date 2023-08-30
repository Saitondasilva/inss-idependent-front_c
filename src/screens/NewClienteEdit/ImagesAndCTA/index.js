import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./ImagesAndCTA.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";
import Dropdown from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";
import axios from "axios";

const optionsPurchase = ["Purchase now", "Purchase tomorrow", "Buy later"];

const ImagesAndCTA = ({ className, data1,  setData1  }) => {
 const [content, setContent] = useState();
  const [optionsBanco, setOptionsBanco] = useState(['--Banco--','AFRILAND','ECOBANK','BGFI']);
  const [banco, setBanco] = useState(optionsBanco[0]);
  //const [optionsBancoID, setOptionsBancoID] = useState([1,2,3]);
 


  {/*function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }*/}
  
  function getBanco(){
    return axios
    .get("/getBanco")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
      }
      setOptionsBanco(a);
      setBanco([optionsBanco[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  {/*useEffect(() => {   
   getBanco()
    
  },[]);*/}

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
          label="Banco"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setBanco}
          options={optionsBanco}
         
        /> 
       </span>
       <TextInput
          className={styles.field}
          label="NIB"
          name="nib_conta"
          type="text"
          required
          
         
        />
      
      <TextInput
          className={styles.field}
          label="Nº Conta"
          name="n_conta"
          type="text"
          required
         
         
        />
      
       
      </div>
    
        
          
      </div>
      
      
    </Card>
  );
};

export default ImagesAndCTA;

import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";
import Panel from "./Panel";
import Loader from "../../../components/Loader";

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1, data ,setData }) => {
  const [content, setContent] = useState();
  const [optionsDocAnexo, setOptionsDocAnexo] = useState(['--Escolha um--', 'BI', 'NIB', 'NIF','Passaport', 'Certidão', 'Cartão Estrangeiro', 'Cartão Residência',  'Licença de Actividade','Outro']);
  const [docAnexo, setDocAnexo] = useState(optionsDocAnexo[0]);
  const [userData, setuserData] = useState({});
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState(""); 
  const {id}=useParams();
  data1.descricao=content;
  var array_data = [];

  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  function getDocAnexo(){
    return axios
    .get("/getUtenteAnexo/"+id)
    .then((response) => {
      console.log("DOC ANEXO",response.data.data)
       if(response.data.data.length>0){
        const Anexo = response.data.data

        setData(Anexo)
       }
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
    if(!data1.tipo_doc || data1.tipo_doc===""){
      setSmsError("Por favor seleciona o tipo do Anexo")
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
        tabela:'pedido_prestacao',
        file: data1.anexo,   
        tipo_anexo: data1.tipo_doc,   
  }  
  return axios
    .post("/sendanexo",data3,{
      headers: { Authorization: `Bearer ${userData.token}`,'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      setSmsSuccess("Anexo Salvo!");
      setSmsError("");
      setLoader(false)
      setData([...data,{id:response.data.data.anexo.id,file:data3.file,tipo_anexo:response.data.data.anexo.tipo_anexo}])
      console.log("FILE",data3.file)
    })
    .catch((err) => {
      setLoader(false);
      setSmsSuccess("");
      setSmsError(err.response.data.message);
      console.log("Error", err);
      return err.response;
    });
    
};

function DeleteAnexo(id,i){
  return axios
  .delete("/DeleteAnexo/"+id)
  .then((response) => {
    if(response.data.data.anexo){
      const deleteVal = [...data]
      deleteVal.splice(i,1)
      setData(deleteVal)
    }
  })
  .catch((err) => {
    console.log("Error", err);
    return err.response;
  });
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
      {loader && <Loader className={styles.loader} />} 
      <button onClick={SaveFile} className={styles.field1}  >Enviar Anexo</button>
     
      {
        data.map((val, i)=>
               
          <div className={styles.description}>
            <div className={styles.group}>
              <span className={styles.field}>
                  <TextInput
              className={styles.field1}
                type="text"
                value={data[i].tipo_anexo }
                required 
                readOnly
                style={{flex: "0 0 calc(90% - 12px)",width: "calc(90% - 12px)",margin: "0 2px 10px", display:"flex"}}       
              />  
              </span>
              <span className={styles.field}>
                  <TextInput
              className={styles.field1}
                type="text"
                value="Adicionado"
                required 
                readOnly
                style={{flex: "0 0 calc(90% - 12px)",width: "calc(90% - 12px)",margin: "0 2px 10px", display:"flex"}}       
              />  
              </span>
              
              <span className={styles.field}>
                  <button className={styles.field1} onClick={()=>DeleteAnexo(data[i].id,i)}>Delete</button>
              </span>
              
            </div>
          </div>
                 
        )
      }
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

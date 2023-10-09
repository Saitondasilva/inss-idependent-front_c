import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../../components/Card";

import TextInput from "../../../../components/TextInput";

import Dropdown from "../../../../components/Dropdown";
import axios from "axios";


// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1, id}) => {
  const [content, setContent] = useState();
  const [userData, setuserData] = useState({});
  const [optionsNivel, setOptionsNivel] = useState(['','Atendimento','DSS']);
  const [nivel, setNivel] = useState(optionsNivel[0]);
  const [NivelID, setNivelID] = useState([]);
  
  data1.descricao=content;
  
  function read(){
    if(data1.id>0){
      // Documento
      var position        =   NivelID.indexOf(data1.type_id)
      setNivel(optionsNivel[position])      
    }
  }

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    
    console.log("Login Information")
    console.log(user);

  },[]);

  useEffect(() => {
    var position        =   optionsNivel.indexOf(nivel);
        data1.type_id  =   NivelID[position];
  }, [nivel]);
///ver Autorização para nã permitir que qualquer um acess
  function getTipoDoc(){
    return axios
    .get("/user/getAllTypeUser",{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
       var a = new Array();
       var b = new Array();    
      for(var i=0; i<response.data.data.Tipo_User.length; i++){
        a.push(response.data.data.Tipo_User[i].descricao)
        b.push(response.data.data.Tipo_User[i].id)       
      }   
      setOptionsNivel(a);
      setNivelID(b);
      setNivel([optionsNivel[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  
  useEffect(() => {
    read()   
  }, [data1]);
  useEffect(() => {
    getTipoDoc(); 
  }, [userData]);
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
          label="Utilizador*"
          name="utilizador"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.utilizador}        
        />
          <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.email}
          currency="@"
        />
        <TextInput
          className={styles.field}
          label="Password"
          name="password"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.password}
        />
        <TextInput
          className={styles.field}
          label="Confirmar Password"
          name="repassword"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.repassword}
        />
         <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Perfil de Utilizador*"
          setValue={setNivel}
          options={optionsNivel}
          onChange={data1.nivel=nivel}
          value={nivel}
        /> </span>   

       </div>
 
      </div>
    </Card>
  );
};
export default NameAndDescription;

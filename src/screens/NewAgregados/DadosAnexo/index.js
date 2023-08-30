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
import Radio from "../../../components/Radio";

const inputStyles = {
  backgroundColor: '#1c1c1c', // Defina a cor de fundo desejada aqui
  padding: '10px', // Exemplo de estilo adicional
  borde:'1px solid #ccc', 
  color: '#FFFFFF',
  borderWidth: 1,
  borderColor: "black",
  borderadius:'20px',
  borderBottom: '20px'

,}

// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsTd, setOptionsTd] = useState(['Sim', 'Não']);
  const [td, setTd] = useState(optionsTd[0]);
  
  data1.descricao=content;

  {/*const options = [
    { value: 'show', label: 'Sim' },
    { value: 'hide', label: 'Não' },
  ];  */}

 // const [selectedOption, setSelectedOption] = useState(options[0].value);
  //const [isFieldVisible, setIsFieldVisible] = useState(true);


 {/* const handleSelect = newValue => {
    setSelectedOption(newValue);

    if (newValue === 'show') {
      setIsFieldVisible(true);
    } else {
      setIsFieldVisible(false);
    }
  };*/}

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
  /*
  function getGenero(){
    return axios
    .get("/getGenero")
    .then((response) => {
       var a = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
      }
      setOptionsGenero(a);
      setGenero([optionsGenero[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }


  useEffect(() => {
    getGenero()
    
  },[]);
*/
  function buscarCep() {
     
    fetch(`http://viacep.com.br/ws/${data1.cep}/json/`, {mode: 'cors'})
     .then((res) => res.json())
     .then((data) => {
           data1.cep=data.cep 
           data1.cidade=data.localidade
           data1.estado=data.logradouro
           setData1(data1)
        
     })
     .catch(err =>{alert("Cep não existente");data1.cep="";});

}
  return (
    <Card
      className={cn(styles.card, className)}
      title="Anexo"
      classTitle="title-green"      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>
    
      
 
       {/*<select className={styles.field} style={inputStyles} value={selectedOption} onChange={e => handleSelect(e.target.value)}>
      
      {options.map(option => (
        <option style={inputStyles}  key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      </select>*/}
<span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Tipo Documento"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setTd}
          options={optionsTd}
          onChange={data1.td=td}
          value={td}
        /> </span>
       
       {td=="Sim" && (

       <TextInput
          className={styles.field}
          label="Anexo"
          name="profissao"
          type="text"
          required
          onChange={onChangeData}
          value={data1.profissao}
        />
        )}
        {td=="Sim" && (
        <TextInput
        className={styles.field}
        label="Código de Transição"
        name=""
        type="text"
        required
        onChange={onChangeData}
        value={data1.bi}
      />

      )}
       
      </div>
     
       
      </div>
    </Card>
  );
};

export default NameAndDescription;


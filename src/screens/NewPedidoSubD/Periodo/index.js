import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Escalao.module.sass";
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

const EscalaoDesc = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsEscalao, setOptionsEscalao] = useState([]);
  const [escalao, setEscalao] = useState(optionsEscalao[0]);
  const [escalaoID, setEscalaoID] = useState([]);
  const [optionsEsquema, setOptionsEsquema] = useState([]);
  const [esquema, setEsquema] = useState(optionsEsquema[0]);
  const [esquemaID, setEsquemaID] = useState([]);
  const [optionsPeriodo, setOptionsPeriodo] = useState(['Mensal', 'Trimestral', 'Simenstral', 'Anual']);
  const [periodo, setPeriodo] = useState(optionsPeriodo[0]);
  const [periodoID, setPeriodoID] = useState([1,3,6,12]);
 
  data1.descricao=content;

  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
 

  function getEscalao(){
    return axios
    .get("/getEscalao")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsEscalao(a);
      setEscalaoID(b)
      setEscalao([optionsEsquema[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }

  function getEsquema(){
    return axios
    .get("/getEsquema")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].esquema)
        b.push(response.data.data[i].id)
      } 
      setOptionsEsquema(a);
      setEsquemaID(b)
      setEsquema([optionsEsquema[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function read(){
  
    if(data1.id>0){
     
      // Escalão
      var position        =   escalaoID.indexOf(data1.id_escalao)
      setEscalao(optionsEscalao[position])
      // Esquema
      var position1        =   esquemaID.indexOf(data1.id_tipo_esquema)
      setEsquema(optionsEsquema[position1])
      // Periodo Contributivo
      var position2       =   periodoID.indexOf(data1.numero_periodo)
      setPeriodo(optionsPeriodo[position2])
    }
  }
  useEffect(() => {
    getEscalao()
    getEsquema()
  },[]);
  useEffect(() => {
    read()
  },[data1]);

  useEffect(() => {
    var position        =  optionsEscalao.indexOf(escalao);
    data1.escalao_id   =  escalaoID[position];
  }, [escalao]);
  
  useEffect(() => {
    var position        =  optionsEsquema.indexOf(esquema);
    data1.esquema_id   =  esquemaID[position];
  }, [esquema]);

  useEffect(() => {
    var position        =  optionsPeriodo.indexOf(periodo);
    data1.periodo_id   =  periodoID[position];
  }, [periodo]);

  return (
    <Card    
      className={cn(styles.card, className)}      
      title="Periodo de Baixa"       
      classTitle="title-green"        
    >
      <div className={styles.description}>
      <hr></hr> 
       
      <div className={styles.group}>   
        
        
      <TextInput
          className={styles.field}
          label="Data de Inicio*"
          name="data_inicio"
          type="date"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.data_inicio}
        />
  
  <TextInput
          className={styles.field}
          label="Numero de dias*"
          name="n_dias"
          type="number"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.n_dias}
        />

        
       
       
      </div>
     
      </div>
     
    
    </Card>
  );
};

export default EscalaoDesc;
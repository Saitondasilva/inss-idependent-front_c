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


const NameAndDescription = ({ className, data1, setData1 }) => {
  const [optionsStep, setOptionsStep] = useState([]);
  const [optionsStepId, setOptionsStepId] = useState([]);
  const [step, setStep] = useState(optionsStep[0]);
  const [userData, setuserData] = useState({});


  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    getStep()
  },[]);

  var sorting1=null;
  useEffect(() => {
    var position        =   optionsStep.indexOf(step);
        sorting1        =   optionsStepId[position];
        data1.step=sorting1;
  },[step]);

  function getStep(){
    return axios
    .get("/getStep")
    .then((response) => {
       var a= new Array();
       var b= new Array();
      for(var i=1; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsStep(a);
      setOptionsStepId(b)
      setStep([optionsStep[0]])
      console.log( "bbbbbb=",b)
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  return (
    <Card
      className={cn(styles.card, className)}
      title="Dados do Progresso"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
        <Dropdown
          className={styles.field}
          label="Etapa do processo"
          name="step"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setStep}
          options={optionsStep}
          //onChange={data1.step=step}
          value={step}
        /> 
       
      </div>
    </Card>
  );
};

export default NameAndDescription;

import React, { useState, useEffect } from "react";
import styles from "./Success.module.sass";
import cn from "classnames";
import Dropdown from "../../../../../../components/Dropdown";
import TextInput from "../../../../../../components/TextInput";
import axios from "axios";
const Success = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsGenero, setOptionsGenero] = useState(['', 'Suspensão', 'Falecimento', 'Reactivação']);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [generoID, setGeneroID] = useState([]);

  data1.descricao=content;

  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    var position        =   optionsGenero.indexOf(genero);
        data1.id_sexo=generoID[position];
  }, [genero]);

  function getGenero(){
    return axios
    .get("/getGenero")
    .then((response) => {
      var a =new Array();
      var b =new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsGenero(a);
      setGeneroID(b);
      setGenero([optionsGenero[0]])
      
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  return (
    <div className={styles.success}>
    {/*  <div className={styles.icon}>
        <span role="img" aria-label="firework">
          🎉
        </span>
  </div>*/}
      <div className={styles.info}>Mudar de Estado!</div>
      <hr></hr>
      <div>O Beneficiário Vai mudar para estado Suspenso </div>
       <span className={styles.field}>
       <TextInput
          className={styles.field}
          label="Observação *"
          name="numero_documento"
          type="text"
          required
          onChange={onChangeData}
          value={data1.numero_documento}
        /></span>
        <hr></hr>
      <button className={cn("button", styles.button)}>Cancelamento</button>
      <button className={cn("button", styles.button)}>Suspender Beneficiário</button>
    </div>
  );
};

export default Success;

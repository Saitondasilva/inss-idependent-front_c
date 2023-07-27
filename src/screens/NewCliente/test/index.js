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
  const [optionsType, setOptionsType] = useState(['--Ecolhe o Banco--','BISTP','AFRILAND','ECOBANK']);
  const [type, setType] = useState(optionsType[0]);
  const [optionsTypeID, setOptionsTypeID] = useState([1,2,3]);

  const [userData, setuserData] = useState({});


  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    var position    =   optionsType.indexOf(type);
    data1.id_type  =   optionsTypeID[position];
  },[type]);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Dados Bancario"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
        <Dropdown
          className={styles.field}
          label="Tipo de banco"
          name="type"
          setValue={setType}
          options={optionsType}
          onChange={data1.type=type}
          value={type}
        /> 
        <TextInput
          className={styles.field}
          label="Senha *"
          name="senha"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          
          onChange={onChangeData}
          value={data1.senha}
        />
        <TextInput
          className={styles.field}
          label="Confirmar Senha *"
          name="senha1"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          
          onChange={onChangeData}
          value={data1.senha1}
        />
       
      </div>
    </Card>
  );
};

export default NameAndDescription;

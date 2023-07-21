import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";

const optionsGenero = ["Masculino", "Feminino", "Outro"];
const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [linguagem, setLinguagem] = useState(optionsLinguagem[0]);
  const [nacionalidade, setNacionalidade] = useState(optionsNacionalidade[0]);

  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <Card
      className={cn(styles.card, className)}
      title="Dados Socias"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
      <div className={styles.group}>
        <TextInput
          className={styles.field}
          label="Facebook url"
          name="facebook"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          require
          onChange={onChangeData}
          value={data1.facebook}
        />
        <TextInput
          className={styles.field}
          label="Twitter url"
          name="twitter"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.twitter}
        />
        <TextInput
          className={styles.field}
          label="Linkedin url"
          name="linkedin"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.linkedin}
        />
        <TextInput
          className={styles.field}
          label="Google plus url"
          name="google_plus"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.google}
        />
        <TextInput
          className={styles.field}
          label="Pinterest url"
          name="pinterest"
          type="text"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.pintrest}
        />
      </div>
      
       
      </div>
    </Card>
  );
};

export default NameAndDescription;

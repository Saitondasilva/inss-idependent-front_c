import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Image from "../../../components/Image";
import DadosPessoais from "../../NewCliente/DadosPessoais";
import DadosSociais from "../../NewCliente/DadosSociais";
import DadosPagamento from "../../NewCliente/DadosPagamento";
import DadosConta from "../../NewCliente/DadosConta";
import DadosProgresso from "../../NewCliente/DadosProgresso";
import Panel from "../../NewCliente/Panel";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import axios from "axios";

const Entry = ({ onConfirm, data1, setData1 }) => {
 
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [userData, setuserData] = useState({});
  const [loader, setLoader] = useState();

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    //shearchCliente(JSON.parse(user));
  },[]);
function validateForm(){

  if(!data1.nome || data1.nome===""){
    setSmsError("Por favor preencha o nome")
    return false;
  }
  if(!data1.apelido || data1.apelido===""){
    setSmsError("Por favor preencha o apelido")
    return false;
  }
  if(!data1.genero || data1.genero===""){
    setSmsError("Por favor preencha o genero")
    return false;
  }
  if(!data1.email || data1.email===""){
    setSmsError("Por favor preencha o email")
    return false;
  }
  if(!data1.contacto || data1.contacto===""){
    setSmsError("Por favor preencha o contacto")
    return false;
  }
  /*
  if(!data1.adress || data1.adress===""){
    setSmsError("Por favor preencha o endereço")
    return false;
  }
  */
  if(!data1.estado || data1.estado===""){
    setSmsError("Por favor preencha o estado de residencia")
    return false;
  }
  if(!data1.pais || data1.pais===""){
    setSmsError("Por favor preencha o país")
    return false;
  }
  if(!data1.cidade || data1.cidade===""){
    setSmsError("Por favor preencha a cidade")
    return false;
  }
  if(!data1.estadocivil || data1.estadocivil===""){
    setSmsError("Por favor preencha o estado civil")
    return false;
  }
  /*
  if(!data1.rgb || data1.rgb===""){
    setSmsError("Por favor preencha o rgb")
    return false;
  }
  */
  if(!data1.cep || data1.cep===""){
    setSmsError("Por favor preencha o cep")
    return false;
  }
  if(!data1.cpf || data1.cpf===""){
    setSmsError("Por favor preencha o cpf")
    return false;
  }
  if(!data1.senha || data1.senha1===""){
    setSmsError("Por favor preencha a senha")
    return false;
  }
  if(data1.senha !== data1.senha1){
    setSmsError("Erro ao confirmar senha")
    return false;
  }

  return true;
  
}
function Save() {
  setLoader(true)
 if(!validateForm()){ setLoader(false); return false} 
  var data={
    first_name: data1.nome,
    last_name: data1.apelido,
    password: data1.senha,
    password1: data1.senha1,
    //gender: data1.genero,
    gender: data1.genero[0],
    email: data1.email,
    phone: data1.contacto,
    //address: data1.adress,
    country: data1.pais,
    //country: 20,
    state: data1.estado,
    city: data1.cidade,
    estado_civil: data1.estadocivil,
   // resume: data1.descricao,
    resume: "data1.descricao",
    facebook_url: data1.facebook,
    twitter_url: data1.twitter,
    google_plus_url: data1.google,
    pinterest_url: data1.pintrest,
   // rgb: data1.rgb,
    cep: data1.cep,
    cpf: data1.cpf.replace(/[^0-9]/g,''),
    id_profission: userData.id,
    value_consult: data1.valor,
    id_user_type: data1.id_type,
    payment_option: data1.tipoPagamento,
    photo:null
  }
  return axios
    .post("/candidate/register",data)
    .then((response) => {
      setSmsSuccess("Registo com sucesso!");
      setSmsError("");
      console.log(response.data.data);
      onConfirm(false)
    })
    .catch((err) => {
      setSmsSuccess("");
      setSmsError(err.response.data.message);
      console.log("Error", err);
      setLoader(false);
      return err.response;
    });
    
    
};
  return (
    <div className={styles.entry}>
      {/*
      <div className={styles.head}>
        <div className={styles.info}>Sign up with Open account</div>
        <div className={styles.btns}>
          <button className={cn("button-stroke", styles.button)}>
            <img src="/images/content/google.svg" alt="Google" />
            Google
          </button>
          <button className={cn("button-stroke", styles.button)}>
            <Image
              className={styles.pic}
              src="/images/content/apple-dark.svg"
              srcDark="/images/content/apple-light.svg"
              alt="Apple"
            />
            Apple ID
          </button>
        </div>
      </div>
      */}
      <div className={styles.body}>
      <div className={styles.row}>
        <div className={styles.col}>
          <DadosPessoais className={styles.card} data1={data1} setData1={setData1}/>
          <DadosConta className={styles.card} data1={data1} setData1={setData1}/>
         {/* <DadosSociais className={styles.card} data1={data1} setData1={setData1}/> */} 
          {/*<DadosPagamento className={styles.card} data1={data1} setData1={setData1}/> */}
          <div className={styles.note}>
            <span>
              Ao continuar você concorda com os
            <Link className={styles.link} to="/sign-in"> Temos e Condições </Link>
             e a 
             <Link className={styles.link} to="/sign-in"> Politica de Privacidade </Link>
            </span>
          </div>
          <br></br>
          {loader && <Loader className={styles.loader} white />}
          <Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
        SaveProfissionalCliente={Save}
        smsError={smsError}
        smsSucess={smsSucess}
      />
        </div>
      </div>
        
      </div>
    </div>
  );
};

export default Entry;

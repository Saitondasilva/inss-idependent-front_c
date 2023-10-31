import React, { useState, useEffect } from "react";
import styles from "./Success.module.sass";
import cn from "classnames";
import Dropdown from "../../../../../../components/Dropdown";
import TextInput from "../../../../../../components/TextInput";
import axios from "axios";
import Loader from "./Loader";



const Success = ({ className, item}) => {
  const [content, setContent] = useState();
  const [optionsGenero, setOptionsGenero] = useState(['', 'Suspensão', 'Falecimento', 'Reactivação']);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [generoID, setGeneroID] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [resolution, setResolution] = useState(false);
  const [userData, setuserData] = useState({});
  const [valido, setValido] = useState(item.id_estado);
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState("");

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

  function Validacao(){
    if(resolution)return false;
    var confirmed = window.confirm('Tem certeza ues desejas validar esse processo?');
    if(confirmed){
        return axios
        .get("/utente/validarUtente/"+item.id,{
          headers: { Authorization: `Bearer ${userData.token}`},
        })
        .then((response) => {
          const rs = response.data.data.Utente
          setValido(rs.id_estado);
          if(rs.id_estado>1)setResolution(true)
        })
        .catch((err) => {
          console.log("Error", err);
          return err.response;
        });

    }   
  }
  function RecusarProcesso(){
    if(! data1.observacao || data1.observacao===""){
      alert("Por favor preencha o campo observação")
      return false;
    }
    setLoader(true)
        return axios
        .patch("/utente/nvalidarUtente/"+item.id,data1,{
          headers: { Authorization: `Bearer ${userData.token}`},
        })
        .then((response) => {
          const rs = response.data.data.Utente
          setSmsError("")
          setSmsSuccess("Observação enviada com sucesso")
          data1.observacao="";
          setLoader(false)
        })
        .catch((err) => {
          //console.log("Error", err);
          setSmsSuccess("")
          setSmsError("Error:"+err)
          setLoader(false)
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
      <div className={styles.info} >Mudar de Estado!</div>
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
        <div className={styles.info}>
              {loader && <Loader className={styles.loader} />} 
              {smsSucess!=="" && <p style={{color:"green"}}>{smsSucess}</p>}
              {smsError!=="" && <p style={{color:"red"}}>{smsError}</p>}
            </div><br></br>
      <button className={cn("button", styles.button)} onClick={RecusarProcesso}>Cancelamento</button>
      <button className={cn("button", styles.button)} onClick={Validacao}>Suspender Beneficiário</button>
    </div>
  );
};

export default Success;

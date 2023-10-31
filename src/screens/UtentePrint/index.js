import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import DadosPessoais from "../UtenteEdit/DadosPessoais";
import Panel from "../UtenteEdit/Panel";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewUtente = () => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [data1, setData1] = useState({});
  const [userData, setuserData] = useState({});
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState("");
  const {id}=useParams();
  var user=null;
  useEffect(() => {
    user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    //shearchCliente(JSON.parse(user));
   if(id)GetUtenteById()
  },[]);

function validateForm(){
  //Validação de Dados do Utente 


  if(!data1.distrito_id || data1.distrito_id===-1){
    setSmsError("Por favor preencha o Distrito")
    return false;
  }
  
  if(data1.antigoNISS==="Sim"){
    if(!data1.codigo_antigo || data1.codigo_antigo===""){
      setSmsError("Por favor preencha Código Antigo (NISS)")
      return false;
    }
  }
  
  return true;
}
function GetUtenteById() {
  return axios
    .get("/utente/getUtenteById/"+id)
    .then((response1) => {
     console.log("UTENTE ANTES",response1.data.data)
     const Utente = response1.data.data.Utente;
     setData1(Utente)
     console.log("UTENTE EDITAR",Utente)
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
};

function SaveProfissionalCliente() {
  setLoader(true)
 console.log("DATA1",data1)
  if(!validateForm()){setLoader(false); return false;}
  var data={
    nome: data1.nome,
   
    codigo_antigo:data1.codigo_antigo
  } 
  return axios
    .post("/utente/register",data,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      setSmsSuccess("Registro com sucesso!");
      setSmsError("");
      setLoader(false)
      clean();
      console.log("REGISTRO ",response.data.data)
    })
    .catch((err) => {
      setLoader(false);
      setSmsSuccess("");
      setSmsError(err.response.data.message);
      console.log("Error", err);
      return err.response;
    });
};
            function clean(){
            data1.nome="";
           
            data1.esquema_id="";
            }

            
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
         
          <DadosPessoais className={styles.card} data1={data1} setData1={setData1} />
 
          
        </div>
       
      </div>
      
    </>
  );
};

export default NewUtente;

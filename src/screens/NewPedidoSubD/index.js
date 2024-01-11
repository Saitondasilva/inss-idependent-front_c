import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import DadosPessoais from "./DadosPessoais";

import DadosAnexo from "./DadosAnexo";

import DadosProfissi from "./DadosProfissi";

import SubMaternid from "./SubMaternid";
import Funeral from "./Funeral";
import Velhice from "./Veclhice";
import Invalidez from "./Invalidez";
import Sobrivivencia from "./Sobrivivencia";
import Panel from "./Panel";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewSubsidio = () => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [data1, setData1] = useState({});
  const [data, setData]=useState([])
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
   if(id)GetPedidoPrestacaoById()
  },[]);

function validateForm(){
  //Validação de Dados do Utente 
  if(!data1.id_utente || data1.id_utente===""){
    setSmsError("Utente não Encontrado")
    return false;
  }
  if(!data1.banco || data1.banco===""){
    setSmsError("Por favor preencha o banco")
    return false;
  }
  if(!data1.nib || data1.nib===""){
    setSmsError("Por favor preencha o nib da conta")
    return false;
  }
  return true;
}
function GetPedidoPrestacaoById() {
  user = localStorage.getItem("userData");
  user==null?setuserData([]):setuserData(JSON.parse(user));
  return axios
    .get("/utente/getallpedidoprestacaoById/"+id,{
      headers: { Authorization: `Bearer ${JSON.parse(user).token}` },
    })
    .then((response1) => {
     console.log("Pedido ANTES",response1.data.data)
     const Pedido = response1.data.data.pedido_prestacao;
     setData1(Pedido)
     console.log("Pedido EDITAR",Pedido)
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
};

function SaveProfissionalCliente() {
  setLoader(true)
  console.log("Data Anexo",data);
  if(!validateForm()){setLoader(false); return false;}
  var data3={
    id_banco: data1.banco_id,
    iban: data1.iban_conta,
    nib: data1.nib,
    n_conta: data1.n_conta,
    id_utente: data1.id_utente,
    n_dias: data1.n_dias,
    data_inicio: data1.data_inicio,
    id_prestacao: 4,        
    tel: data1.tel,
    email: data1.email,
    anexos:data,
    observacao: "data1.descricao" 
  } 
  return axios
    .post("/utente/pedirprestacao",data3,{
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


function AlterarPedido() {
  setLoader(true)
  if(!validateForm()){setLoader(false); return false;}
  var data3={
    id_banco: data1.banco_id,
    iban: data1.iban_conta,
    nib: data1.nib_conta,
    n_conta: data1.n_conta,
    id_utente: data1.id_utente,
    n_dias: data1.n_dias,
    data_inicio: data1.data_inicio,
    id_prestacao: 4,        
    tel: data1.tel,
    email: data1.email,
    anexos:data,
    observacao: "data1.descricao"
  } 
 
  return axios
    .patch("/editPedirprestacao/"+id,data3,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      setSmsSuccess("Aleterado com sucesso!");
      setSmsError("");
      setLoader(false)
      //clean();
    })
    .catch((err) => {
      setLoader(false);
      setSmsSuccess("");
      setSmsError(err.response);
      console.log("Error", err);
      return err.response;
    });
    
};
            function clean(){
            data1.banco_id="";
            data1.iban_conta="";
            data1.nib_conta="";
            data1.n_conta="";
            data1.id_utente="";
            data1.n_dias="";
            data1.data_inicio="";
            data1.tel="";
            data1.email="";            
            setData([{}])
            }

            
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
          
          {   id==="-1"&&     
         
          <DadosPessoais className={styles.card} data1={data1} setData1={setData1} />   }          
     
        
       {   id==="-2"&&   

       <SubMaternid className={styles.card} data1={data1} setData1={setData1}/> 

       }
        {   id==="-3"&&   

        <Funeral className={styles.card} data1={data1} setData1={setData1}/> 

        }
        {   id==="-4"&&   

        <Velhice className={styles.card} data1={data1} setData1={setData1}/> 

        }
        {   id==="-5"&&   

        <Invalidez className={styles.card} data1={data1} setData1={setData1}/> 

        }

      {   id==="-6"&&   

      <Sobrivivencia className={styles.card} data1={data1} setData1={setData1}/> 

      }
    
     <DadosAnexo className={styles.card} data1={data1} setData1={setData1} data={data} setData={setData}/>

    <DadosProfissi className={styles.card} data1={data1} setData1={setData1}/> 
 
        </div>
       
      </div>
      {<Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
        SaveProfissionalCliente={SaveProfissionalCliente}
        utente_id={id}
        smsError={smsError}
        smsSucess={smsSucess}
        loader={loader}
        EditarUtente={AlterarPedido}
        />}
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
        />
      </Modal>
    </>
  );
};

export default NewSubsidio;

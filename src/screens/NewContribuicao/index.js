import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import DadosContrib from "./DadosContrib";
import DadosAnexo from "./DadosAnexo";
import DadosTRansa from "./DadosTRansa";
import Panel from "./Panel";

import axios from "axios";

const NewProduct = () => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [data1, setData1] = useState({});
  const [data,setData]=useState([])
  const [Contribuicao,setContribuicao]=useState(null)
  const [userData, setuserData] = useState({});
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState("");

  var user=null;
  useEffect(() => {
    user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    //shearchCliente(JSON.parse(user));
  },[]);

function validateForm(){
  
  if(!data1.id_utente || data1.id_utente===""){
    setSmsError("Utente não encontrados")
    return false;
  }
  if(!data1.forma_transacao || data1.forma_transacao===""){
    setSmsError("Por favor seleciona uma forma de transação")
    return false;
  }
  if(!data1.banco || data1.banco===""){
    setSmsError("Por favor seleciona um banco")
    return false;
  }
  if(!data1.data_transacao || data1.data_transacao===""){
    setSmsError("Por favor seleciona uma data")
    return false;
  }
  if(Contribuicao!==null){
    console.log("Contribuicao", Contribuicao.utente)
    setSmsError("Este Codigo de transação ja foi utilisado pelo:"+Contribuicao.utente.nome)
    return false;
  }
  if(!data1.valor_total || data1.valor_total==="" || data1.valor_total<=1){
    setSmsError("Por favor introduza um valor valido")
    return false;
  }
  if(!data1.anexo || data1.anexo===""){
    setSmsError("Por favor adiciona um ficheiro comprovativo")
    return false;
  }
  if(!data1.vistoDetalhe){
    setSmsError("Por favor, verifica os detalhes de pagamento!")
    data1.valor_total=0
    setData([])
    return false;
  }
  if(!data1.codigo_transacao || data1.codigo_transaca===""){
    setSmsError("Por favor, introduza o codigo do documento Bancário")
    return false;
  }

  return true;
  
}
function PagarContribuicao() {
  confirmarCodigo()
  setLoader(true)
  if(!validateForm()){setLoader(false); return false;}
   
      var data3={
    forma_transacao: data1.forma_transacao,
    data_transacao: data1.data_transacao,
    codigo_transacao: data1.codigo_transacao,
    valor_total: data1.valor_total,
    anexo: data1.anexo,
    banco: data1.banco,
    id_utente: data1.id_utente,
    detalhes_pagamentos: data, 
  }
  console.log("BANCO", data1.banco)
  return axios
    .post("/utente/pagarContribuicao",data3,{
      headers: { Authorization: `Bearer ${userData.token}`,'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      setSmsSuccess("Registro com sucesso!");
      setSmsError("");
      setLoader(false)
      clean();
      console.log(response.data.data)
    })
    .catch((err) => {
      setLoader(false);
      setSmsSuccess("");
      setSmsError(err.response.data.message);
      console.log("Error", err);
      return err.response;
    });
    
};
function confirmarCodigo() {
  return axios
    .get("/confirmaCodigoTransacao/"+data1.codigo_transacao,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
     if(typeof (response.data.data) !== 'undefined'){
      setContribuicao(response.data.data.Contribuicao)
     }else{
      setContribuicao(null)
     }
    })
    .catch((err) => {
      setContribuicao(null)
    });
    
};
function clean(){
 data1.nif="";
 data1.valor_total="";
}
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
       
          <DadosContrib className={styles.card} data1={data1} setData1={setData1}/>          
         
          <DadosTRansa className={styles.card} data1={data1} data={data} setData={setData} setData1={setData1}/>
          <DadosAnexo className={styles.card} data={data} setData={setData}/>

         
          
        </div>
        
      </div>
      {<Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
        SavePagarContribuicao={PagarContribuicao}
        smsError={smsError}
        smsSucess={smsSucess}
        loader={loader}
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

export default NewProduct;

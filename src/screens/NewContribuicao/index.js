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
  const [data,setData]=useState([{ano:"",mes:"",valor_pago:""}])
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
  if(!data1.cpf || data1.cpf===-1){
    setSmsError("Por favor preencha a etapa do progresso")
    return false;
  }

  return true;
  
}
function PagarContribuicao() {
  setLoader(true)
  console.log("detalhes_pagamentos",data)
  //if(!validateForm()){setLoader(false); return false;}
  var data3={
    forma_transacao: data1.forma_transacao,
    data_transacao: data1.data_transacao,
    codigo_transacao: data1.codigo_transacao,
    //gender: 1,
    valor_total: data1.valor_total,
    anexo: "teste",
    id_utente: data1.id_utente,
    detalhes_pagamentos: data,
   
  }
  
  return axios
    .post("/utente/pagarContribuicao",data3,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      setSmsSuccess("Registro com sucesso!");
      setSmsError("");
      setLoader(false)
      //clean();
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

function clean(){
 data1.nome="";
 data1.apelido="";
data1.genero="";
data1.email="";
data1.contacto="";
data1.adress="";

}
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
       
          <DadosContrib className={styles.card} data1={data1} setData1={setData1}/>          
         
          <DadosTRansa className={styles.card} data1={data1} setData1={setData1}/>
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

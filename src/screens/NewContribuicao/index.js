import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import DadosContrib from "./DadosContrib";
import DadosAnexo from "./DadosAnexo";
import DadosTRansa from "./DadosTRansa";







import axios from "axios";

const NewProduct = () => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [data1, setData1] = useState({});
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
function SaveProfissionalCliente() {
  setLoader(true)
  if(!validateForm()){setLoader(false); return false;}
  var data={
    first_name: data1.nome,
    last_name: data1.apelido,
    gender: data1.genero[0],
    //gender: 1,
    email: data1.email,
    phone: data1.contacto,
    address: data1.adress,
    country: data1.pais,
    state: data1.estado,
    city: data1.cidade,
    estado_civil: data1.estadocivil,
   // resume: data1.descricao,
    resume: "data1.descricao",
    facebook_url: data1.facebook,
    twitter_url: data1.twitter,
    google_plus_url: data1.google,
    pinterest_url: data1.pintrest,
    //rgb: data1.rgb,
    cep: data1.cep,
    cpf: data1.cpf,
    id_profission: userData.id,
    value_consult: data1.valor,
    step: data1.step,
    payment_option: data1.tipoPagamento,
    photo: data1.photo,
  }
  
  console.log("Data",data)
  return axios
    .post("/candidate/registerClientByProfissional",data,{
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
data1.pais="";
data1.estado="";
data1.cidade="";
data1.estadocivil="";
 data1.facebook="";
data1.twitter="";
 data1.google="";
data1.pintrest="";
data1.rgb="";
data1.cep="";
data1.cpf="";
userData.id="";
data1.valor="";
data1.step="";
}
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
       
          <DadosContrib className={styles.card} data1={data1} setData1={setData1}/>          
         
          <DadosTRansa className={styles.card} data1={data1} setData1={setData1}/>
          {<DadosAnexo className={styles.card} data1={data1} setData1={setData1}/>}

          {
          /*
            <ImagesAndCTA className={styles.card} />
            <Price className={styles.card} />
            <CategoryAndAttibutes className={styles.card} />
            <ProductFiles className={styles.card} />
            <Discussion className={styles.card} />
          */
          }
          
        </div>
        
      </div>
      {/*<Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
        SaveProfissionalCliente={SaveProfissionalCliente}
        smsError={smsError}
        smsSucess={smsSucess}
        loader={loader}
        />*/}
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

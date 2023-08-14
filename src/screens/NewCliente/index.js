import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import DadosPessoais from "./DadosPessoais";
import DadosSociais from "./DadosSociais";
import DadosPagamento from "./DadosPagamento";
import DadosProgresso from "./DadosProgresso";
import DadosConta from "./DadosBancaria";
import DadosContacto from "./Contacto";
import DadosEndereco from "./Endereco";
import DadosEscalao from "./Escalao";
import DadosAnexo from "./DadosAnexo";
import DadosOutraDec from "./DadosOutraDec";
import DadosProfissi from "./DadosProfissi";
import Preview from "./Preview";
import Panel from "./Panel";
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

  {/*Validação de Dados do Utente */}
  if(!data1.nome || data1.nome===""){
    setSmsError("Por favor preencha o nome")
    return false;
  }
  if(!data1.bi || data1.bi===""){
    setSmsError("Por favor preencha o nº Documento")
    return false;
  }

  if(!data1.email || data1.email===""){
    setSmsError("Por favor preencha o email")
    return false;
  }
  if(!data1.nome_pai || data1.nome_pai===""){
    setSmsError("Por favor preencha o nome_pai")
    return false;
  }
  if(!data1.nome_mae || data1.nome_mae===""){
    setSmsError("Por favor preencha o nome_mae")
    return false;
  }
  if(!data1.nif || data1.nif===""){
    setSmsError("Por favor preencha o nif")
    return false;
  }
  if(!data1.profisao || data1.profisao===""){
    setSmsError("Por favor preencha o profissao")
    return false;
  }
  
 {/* if(!data1.estado_civil || data1.estado_civil===""){
    setSmsError("Por favor preencha o estado_civil")
    return false;
  }
  
  if(!data1.data_nasc || data1.data_nasc===""){
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
{/*Validação dos Dados de Endereço */}
  {/*if(!data1.morada || data1.morada===""){
    setSmsError("Por favor preencha o morada")
    return false;
  }

  if(!data1.ponto_referencia || data1.ponto_referencia===-1){
    setSmsError("Por favor preencha o ponto_referencia")
    return false;
  }
  {/*Validação de Dados de Telemovel*/}
  {/*if(!data1.tel || data1.tel===""){
    setSmsError("Por favor preencha o contacto")
    return false;
  }
  

  {/*Validação de Dados do Utente */}
  {/*if(!data1.cep || data1.cep===""){
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
  }*/}

  return true;
  
}
function SaveProfissionalCliente() {
  setLoader(true)
  if(!validateForm()){setLoader(false); return false;}
  var data={
    nome: data1.nome,
    nif: "123456789",
    bi: "124356",
    //sexo: data1.genero[0],
    sexo:"Masculino",
    caixa_postal: data1.caixa_postal,
    email: data1.email,
    tel: data1.tel,
    country: data1.pais,
    estado_civil: data1.estadocivil,
    morada: data1.morada,
    ponto_referencia: data1.ponto_referencia,
    data_nasc: data1.data_nasc,
    id_tipo_utente: 1,
    id_distrito: 1,
    id_banco: 1,
    iban_conta: "11111111111111111111",
    nib_conta: "22222222222222222",
    n_conta: "21312345",
    nome_pai: "Artur mendonça tavares",
    nome_mae: "Maria Menezes de Deus Lima",
    esta_instcrito: 1,
    empresa_que_trabalhou: "2021/05/01",
    tem_outro_trabalho:"aa",
    outra_entidade_patronal: "aa",
    outra_local_trabalho: "aa",
    recebe_pensao: "aa",
    pensao_que_recebe: "aa"
   // resume: data1.descricao,
    //rgb: data1.rgb,
   // cep: data1.cep,
    
    /*id_profission: userData.id,*/
    //value_consult: data1.valor,
    //step: data1.step,
    //payment_option: data1.tipoPagamento,
    //photo: data1.photo,
  }
  
  console.log("Data",data)
  return axios
    .post("/utente/register",data,{
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
          <DadosPessoais className={styles.card} data1={data1} setData1={setData1}/>
          {
          
          <DadosConta className={styles.card} data1={data1} setData1={setData1}/>
          /*
          <DadosPagamento className={styles.card} data1={data1} setData1={setData1} user={user}/>
          */}
          {
            <DadosEndereco className={styles.card} data1={data1} setData1={setData1}/>
          }

          {
             <DadosContacto className={styles.card} data1={data1} setData1={setData1}/>
          }

          {
             <DadosEscalao className={styles.card} data1={data1} setData1={setData1}/>
          }
          {
             <DadosAnexo className={styles.card} data1={data1} setData1={setData1}/>
          }
           {
             <DadosProfissi className={styles.card} data1={data1} setData1={setData1}/>
          }
          {
             <DadosOutraDec className={styles.card} data1={data1} setData1={setData1}/>
          }


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
      {<Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
        SaveProfissionalCliente={SaveProfissionalCliente}
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

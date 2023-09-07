import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import DadosPessoais from "./DadosPessoais";
import DadosConta from "./DadosBancaria";
import DadosContacto from "./Contacto";
import DadosEndereco from "./Endereco";
import DadosEscalao from "./Escalao";
import DadosAnexo from "./DadosAnexo";
import DadosOutraDec from "./DadosOutraDec";
import DadosProfissi from "./DadosProfissi";
import Panel from "./Panel";
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
  if(!data1.id_tipo_documento || data1.id_tipo_documento===""){
    setSmsError("Por favor preencha o Tipo do Documento")
    return false;
  }
  if(!data1.numero_documento || data1.numero_documento===""){
    setSmsError("Por favor preencha o nº Documento")
    return false;
  }
  if(!data1.nome || data1.nome===""){
    setSmsError("Por favor preencha o nome")
    return false;
  }
  if(!data1.data_nasc || data1.data_nasc===""){
    setSmsError("Por favor preencha o estado de residencia")
    return false;
  }
  if(!data1.nome_pai || data1.nome_pai===""){
    setSmsError("Por favor preencha o nome do pai")
    return false;
  }
  if(!data1.nome_mae || data1.nome_mae===""){
    setSmsError("Por favor preencha o nome da mãe")
    return false;
  }
  if(!data1.nif || data1.nif===""){
    setSmsError("Por favor preencha o nif")
    return false;
  }
  if(!data1.sexo_id || data1.sexo_id===""){
    setSmsError("Por favor preencha o genero")
    return false;
  }
  if(!data1.estadocivil_id || data1.estadocivil_id===""){
    setSmsError("Por favor preencha o Estado Civil")
    return false;
  }
  if(!data1.pais_id || data1.pais_id===""){
    setSmsError("Por favor preencha a Nacionalidade")
    return false;
  }
 /*
 if(!data1.banco_id || data1.banco_id===""){
    setSmsError("Por favor preencha o banco")
    return false;
  }
  if(!data1.nib_conta || data1.nib_conta===""){
    setSmsError("Por favor preencha o NIB")
    return false;
  }
  if(!data1.n_conta || data1.n_conta===""){
    setSmsError("Por favor preencha o número da conta")
    return false;
  }
  */
  if(!data1.morada || data1.morada===""){
    setSmsError("Por favor preencha o Localidade")
    return false;
  }
  if(!data1.ponto_referencia || data1.ponto_referencia===-1){
    setSmsError("Por favor preencha o Ponto de Referencia")
    return false;
  }
  if(!data1.distrito_id || data1.distrito_id===-1){
    setSmsError("Por favor preencha o Distrito")
    return false;
  }
  if(!data1.tel || data1.tel===""){
    setSmsError("Por favor preencha o Telemovel")
    return false;
  }
  /*if(!data1.email || data1.email===""){
    setSmsError("Por favor preencha o email")
    return false;
  }*/
  if(!data1.esquema_id || data1.esquema_id===""){
    setSmsError("Por favor preencha o Esquema")
    return false;
  }
  if(!data1.escalao_id || data1.escalao_id===""){
    setSmsError("Por favor preencha o Escalão")
    return false;
  }
  if(!data1.periodo_id || data1.periodo_id===""){
    setSmsError("Por favor preencha o periodo contributivo")
    return false;
  }
  if(!data1.proficao || data1.proficao===""){
    setSmsError("Por favor preencha o profissao")
    return false;
  }
  if(!data1.data_inicio_actividade || data1.data_inicio_actividade===""){
    setSmsError("Por favor preencha a Data de Inicio da Actividade")
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
    .then((response) => {
     console.log(response.data.data)
     const Utente = response.data.data.Utente;
     
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
 
  if(!validateForm()){setLoader(false); return false;}
  var data={
    nome: data1.nome,
    nif: data1.nif,
    email: data1.email,
    caixa_postal: data1.caixa_postal,
    id_tipo_documento: data1.id_tipo_documento,
    numero_documento: data1.numero_documento,
    numero_porta: data1.numero_porta,        
    tel: data1.tel,
    tel2: data1.tel2,
    morada: data1.morada,
    ponto_referencia: data1.ponto_referencia,
    data_nasc: data1.data_nasc,
    id_sexo : data1.sexo_id,
    tipo_utente: 1,
    periodo: data1.periodo_id,
    id_distrito: data1.distrito_id,
    id_banco: data1.banco_id,
    id_estado_civil: data1.estadocivil_id,
	  proficao: data1.proficao,
    id_nacionalidade: data1.pais_id,
	  data_inicio_actividade: data1.data_inicio_actividade,
    n_conta: data1.n_conta,
    iban_conta: "11111111111111111111",
    nib_conta: data1.nib_conta,    
    nome_pai: data1.nome_pai,
    nome_mae: data1.nome_mae,
    id_escalao: data1.escalao_id,
    id_esquema: data1.esquema_id,
    esta_instcrito: data1.antigoNISS ==="Sim" ? true : false,
    empresa_que_trabalhou: data1.empresa_que_trabalhou,
    tem_outro_trabalho: false,
    outra_entidade_patronal: "",
    outra_local_trabalho: "",
    recebe_pensao: false,
    pensao_que_recebe: "",  
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
            data1.nif="";
            data1.email="";
            data1.caixa_postal="";
            data1.id_tipo_documento="";
            data1.numero_documento="";
            data1.numero_porta="";
            data1.tel="";
            data1.morada="";
            data1.ponto_referencia="";
            data1.data_nasc="";
            data1.sexo_id="";
            data1.distrito_id="";
            data1.banco_id="";
            data1.data1.estadocivil_id="";
            data1.data1.pais_id="";
            data1.data_inicio_actividade="";
            data1.n_conta="";
            data1.nib_conta="";
            data1.nome_pai="";
            data1.nome_mae="";
            data1.escalao_id="";
            data1.esquema_id="";
            }

            
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
         
          <DadosOutraDec className={styles.card} data1={data1} setData1={setData1}/>

          <DadosPessoais className={styles.card} data1={data1} setData1={setData1} />

          <DadosConta className={styles.card} data1={data1} setData1={setData1}/>
         
          <DadosEndereco className={styles.card} data1={data1} setData1={setData1}/>
          
          <DadosContacto className={styles.card} data1={data1} setData1={setData1}/>
          
          <DadosEscalao className={styles.card} data1={data1} setData1={setData1}/>
                  
          <DadosAnexo className={styles.card} data1={data1} setData1={setData1}/>
          
          <DadosProfissi className={styles.card} data1={data1} setData1={setData1}/>
          
          
          
          
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

export default NewUtente;

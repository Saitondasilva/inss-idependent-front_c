import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import DadosPessoais from "../NewCliente/DadosPessoais";
import DadosAnexo from "../NewCliente/DadosAnexo";
import DadosPessoAgre from "./DadosPessoAgre";
import DadosOutraDec from "../NewCliente/DadosOutraDec";
import DadosConta from "../NewCliente/DadosBancaria";
import DadosContacto from "../NewCliente/Contacto";
import DadosEndereco from "../NewCliente/Endereco";
import axios from "axios";
import Panel from "../NewCliente/Panel";

const NewProduct = () => {
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

  var user=null;
  useEffect(() => {
    user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    //shearchCliente(JSON.parse(user));
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
      setSmsError("Por favor preencha a data de nascimento")
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
    if(!data1.id_sexo || data1.id_sexo===""){
      setSmsError("Por favor preencha o genero")
      return false;
    }
    if(!data1.id_estado_civil || data1.id_estado_civil===""){
      setSmsError("Por favor preencha o Estado Civil")
      return false;
    }
    if(!data1.pais_id || data1.pais_id===""){
      setSmsError("Por favor preencha a Nacionalidade")
      return false;
    }

    if(!data1.morada || data1.morada===""){
      setSmsError("Por favor preencha o Localidade")
      return false;
    }
    if(!data1.ponto_referencia || data1.ponto_referencia===-1){
      setSmsError("Por favor preencha o Ponto de Referencia")
      return false;
    }
    if(!data1.id_distrito || data1.id_distrito===-1){
      setSmsError("Por favor preencha o Distrito")
      return false;
    }
    if(!data1.tel || data1.tel===""){
      setSmsError("Por favor preencha o Telemovel")
      return false;
    }
    if(!data1.proficao || data1.proficao===""){
      data1.proficao ="-"
    }

    if(data1.antigoNISS==="Sim"){
      if(!data1.codigo_antigo || data1.codigo_antigo===""){
        setSmsError("Por favor preencha Código Antigo (NISS)")
        return false;
      }
    }
    
    return true;
  }

function SaveProfissionalCliente() {
  setLoader(true)
  if(!validateForm()){setLoader(false); return false;}
  var data3={
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
    id_sexo : data1.id_sexo,
    tipo_utente: 2,
    anexos:data,
    id_distrito: data1.id_distrito,
    id_banco: data1.banco_id,
    id_estado_civil: data1.id_estado_civil,
	  proficao: data1.proficao,
    id_nacionalidade: data1.pais_id,
    n_conta: data1.n_conta,
    iban_conta: "11111111111111111111",
    nib_conta: data1.nib_conta,    
    nome_pai: data1.nome_pai,
    nome_mae: data1.nome_mae,
    esta_instcrito: data1.antigoNISS ==="Sim" ? true : false,
    empresa_que_trabalhou: data1.empresa_que_trabalhou,
    tem_outro_trabalho: false,
    outra_entidade_patronal: "",
    outra_local_trabalho: "",
    recebe_pensao: false,
    pensao_que_recebe: "",  
    codigo_antigo:data1.codigo_antigo,
    grau_parentesco:"Teste Grau"
  } 
 
  return axios
    .post("/utente/addAgregado/"+data1.id_utente,data3,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      setSmsSuccess("Registro com sucesso!");
      setSmsError("");
      setLoader(false)
      clean();
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
  data1.id_sexo="";
  data1.id_distrito="";
  data1.banco_id="";
  data1.id_estado_civil="";
  data1.pais_id="";
  data1.data_inicio_actividade="";
  data1.n_conta="";
  data1.nib_conta="";
  data1.nome_pai="";
  data1.nome_mae="";
  data1.escalao_id="";
  data1.esquema_id="";
  //setData(null)
  }

  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
        
          <DadosPessoAgre className={styles.card} data1={data1} setData1={setData1}/>
          <DadosOutraDec className={styles.card} data1={data1} setData1={setData1}/>
          <DadosPessoais className={styles.card} data1={data1} setData1={setData1}/>   
          <DadosConta className={styles.card} data1={data1} setData1={setData1}/>
         <DadosEndereco className={styles.card} data1={data1} setData1={setData1}/>
         <DadosContacto className={styles.card} data1={data1} setData1={setData1}/>
          <DadosAnexo className={styles.card} data1={data1} setData1={setData1} data={data} setData={setData}/>

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

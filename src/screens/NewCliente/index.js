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

  //Validação de Dados do Utente 
  if(!data1.nome || data1.nome===""){
    setSmsError("Por favor preencha o nome")
    return false;
  }
  if(!data1.numero_documento || data1.numero_documento===""){
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
  console.log("DATA SEND ", data1.escalao_id);
  if(!validateForm()){setLoader(false); return false;}
  var data={
    nome: data1.nome,
    nif: data1.nif,
    email: data1.email,
    caixa_postal: data1.caixa_postal,
    id_tipo_documento: data1.documento_id,
    numero_documento: data1.numero_documento,
    numero_porta: data1.N_porta,        
    tel: data1.tel,
    morada: data1.morada,
    ponto_referencia: data1.ponto_referencia,
    data_nasc: data1.data_nasc,
    id_sexo : data1.sexo_id,
    tipo_utente: 1,
    id_distrito: data1.distrito_id,
    id_banco: data1.banco_id,
    id_estado_civil: data1.estadocivil_id,
	  id_proficao: 1,
    id_nacionalidade: data1.pais_id,
	  data_inicio_actividade: data1.data_inicio_activ,
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
      ///clean();
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
            data1.documento_id="";
            data1.numero_documento="";
            data1.N_porta="";
            data1.tel="";
            data1.morada="";
            data1.ponto_referencia="";
            data1.data_nasc="";
            data1.sexo_id="";
            data1.distrito_id="";
            data1.banco_id="";
            data1.data1.estadocivil_id="";
            data1.data1.pais_id="";
            data1.data_inicio_activ="";
            data1.n_conta="";
            data1.nib_conta="";
            data1.nome_pai="";
            data1.nome_mae="";
            data1.escalao_id="";
            data1.esquema_id="";
            }


 {/*  function CodigoIss() {
                const prefixo = '105';
                const [contador, setContador] = useState(1);
              
                // Função para gerar o próximo código autoincrementado
                const gerarProximoCodigo = () => {
                  const codigo = `${prefixo}${contador.toString().padStart(6, '0')}`;
                  setContador(contador + 1);
                  return codigo;
                };
              
                const codigo = gerarProximoCodigo();
  } */}     


            
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
          <DadosPessoais className={styles.card} data1={data1} setData1={setData1}/>
          {
          
          <DadosConta className={styles.card} data1={data1} setData1={setData1}/>
          /*
          <DadosPagamento className={styles.card} data1={data1} setData1={setData1} user={user}/>
          */
          }
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

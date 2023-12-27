import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../../components/Card";

import TextInput from "../../../../components/TextInput";
import axios from "axios";
import Tooltip from "../../../Tooltip";
import Switch from "../../../Switch";
import Loader from "../../../Loader";

const NameAndDescription = ({ className, item}) => {

  const [detalhesMensais, setDetalhesMensais] = useState([]);
  const [APagar, setAPagar] = useState(0);
  const [TotalAPagar, setTotalAPagar] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [resolution, setResolution] = useState(false);
  const [userData, setuserData] = useState({});
  const [valido, setValido] = useState(item.id_estado);
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [smsResponse, setSMSResponse] = useState("");
  const [loader, setLoader] = useState("");

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    getDocAnexo()
    if(valido>1)setResolution(true)
  },[]);
  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  function getDocAnexo(){
    return axios
    .get("/getUtenteAnexo/"+item.id)
    .then((response) => {
       if(response.data.data.length>0){
        const Anexo = response.data.data

        setData(Anexo)
        console.log("Anexo",Anexo)
       }
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    }); 
  }
 function calcTotal(){
  var total = 0;
  total=1*APagar+1*data1.vProposto;
  setTotalAPagar(total)
 }

  const openFile = async (anexoId) => {
    try {

      // Faça a solicitação à API Laravel para baixar o arquivo
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/utente/anexo/${anexoId}`,{
        headers: { Authorization: `Bearer ${userData.token}`},
      });

      if (!response.ok) {
        throw new Error('Falha ao baixar o arquivo.');
      }

      // Obtenha o conteúdo do arquivo como blob
      const blob = await response.blob();

      // Crie uma URL para o blob
      const url = window.URL.createObjectURL(blob);

      // Abra o arquivo em uma nova janela ou aba
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        throw new Error('Não foi possível abrir uma nova janela ou aba.');
      }

      // Libere o objeto URL após o uso
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

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
  function ApresentarCalculo(){
        return axios
        .get("/utente/calculoPedido/"+item.id,{
          headers: { Authorization: `Bearer ${userData.token}`},
        })
        .then((response) => {
          const rs = response.data.data.details_mensal
          const apagar = response.data.data.total_apagar
          setDetalhesMensais(rs);
          setAPagar(apagar);
          setTotalAPagar(apagar)
          if(apagar===0){
            setSMSResponse("Utente não Possui Prazo de Garantia para este pedido!")
          }
          console.log("DETAILS MENSAL",detalhesMensais)
        })
        .catch((err) => {
          console.log("Error", err);
          return err.response;
        });

      
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
    <Card
      className={cn(styles.card, className)}
      title="Detalhes da Prestação"
      classTitle="title-green"      
    >
        
 
        <div className={styles.description}>
        <h2 className={styles.title} >Dados Pessoais</h2><hr></hr>
          <div className={styles.group}>
            <div className={styles.field}>
              <h4>Nome do Beneficiário: {item.nome} </h4>  
              <hr ></hr>
              <p>NIF do Beneficiario: {item.nif}</p>   
              <hr ></hr>
              <p>Codigo : {item.codigo}</p>  
              <hr ></hr>
              <p>Email: {item.email}</p>
              <hr ></hr>
              <p>Tel: {item.tel}</p>
              <hr ></hr>
            </div>
            <div className={styles.field}>
            <p>Banco: {item.nome_banco}</p>  
              <hr ></hr>
              <p>NIB: {item.nib}</p>  
              <hr ></hr>
              <p>IBAN: {item.iban}</p>  
              <hr ></hr>
              <p>Numero de Conta Bancária: {item.n_conta}</p>  
              <hr ></hr>
              
            </div>
          </div>
          
        </div>

        <div className={styles.description}>
          <h2 className={styles.title}>Informações da Prestação</h2><hr></hr>
          <p>Tipo Prestação <span style={{color:"#FF6A55"}}>{item.descr_prestacao}</span></p>
          <hr ></hr>
          <p>Processo Nº: {item.id_processo}</p>
          <hr ></hr>
          <p>Data de Início: {item.data_inicio}</p>
          <hr ></hr>
          <p>Numero de Dias: {item.n_dias}</p>
          <hr ></hr>
          <p>Observação: {item.observacao}</p> 
          <hr></hr>
        </div>

       <div className={styles.description}>
        <h2 className={styles.title}>Calculo</h2><hr></hr>
          <button className={cn("button", styles.button)} onClick={ApresentarCalculo}>
                      <span className={styles.field}>
                        Apresentar Calculo
                      </span>
          </button><br></br>
          <div className={styles.description}>
          <div className={styles.group}>
                <div className={styles.field}>
                  Mês/Ano
                </div>
                <div className={styles.field}>
                  Valor
                </div>   
          </div> 
          <hr></hr>
            {
              detalhesMensais.map((val, i)=>
              i<7 && (
              <>
               <div className={styles.group}>
                <div className={styles.field}>
                  {detalhesMensais[i].mes}/{detalhesMensais[i].ano}
                </div>
                <div className={styles.field}>
                  {detalhesMensais[i].valor}
                </div>  
                
              </div> 
              <hr></hr>  
              </>
              )
              
                  
              )
            }
            <TextInput
            className={styles.field1}
            label="Valor Proposto"
            name="vProposto"
            type="text"
            required
            value={data1.vProposto}
            onChange= {onChangeData}
            onKeyUp={calcTotal}
          />
          
          <p style={{color:"red"}}>{smsResponse}</p>
            <h3 className={styles.title}>Valor Calculado: <span style={{color:"#FF6A55"}}>{APagar}</span></h3><hr></hr>
            <h3 className={styles.title}>TOTAL A PAGAR: <span style={{color:"#FF6A55"}}>{TotalAPagar}</span></h3><hr></hr>
          </div>

      </div>
      <div className={styles.description}>
          <div className={styles.group}>
          <div className={styles.field}>
          <TextInput
            className={styles.field1}
            label="Caso não, Envia uma observação"
            name="observacao"
            type="text"
            required
            value={data1.observacao}
            onChange= {onChangeData}
          />
           <div className={styles.info}>
            {loader && <Loader className={styles.loader} />} 
            {smsSucess!=="" && <p style={{color:"green"}}>{smsSucess}</p>}
            {smsError!=="" && <p style={{color:"red"}}>{smsError}</p>}
          </div><br></br>
          <button className={cn("button-stroke-red", styles.button)} >Recuar Processo</button>
        </div>
                <div className={styles.field}>
                <button className={cn("button-stroke-green", styles.button)} >Validar & Avançar</button>
                </div>   
          </div> 
      </div> 
      </Card>
  );
};
export default NameAndDescription;

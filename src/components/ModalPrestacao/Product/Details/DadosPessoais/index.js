import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../../../components/Card";

import TextInput from "../../../../../components/TextInput";
import axios from "axios";
import Tooltip from "../../../../Tooltip";
import Switch from "../../../../Switch";
import Loader from "../../../../Loader";

const NameAndDescription = ({ className, item}) => {

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [resolution, setResolution] = useState(false);
  const [userData, setuserData] = useState({});
  const [valido, setValido] = useState(item.id_estado);
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
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
      title="Detalhes do Utente"
      classTitle="title-green"      
    >
        
      { userData.id_tipo>1 &&
      
      <div className={styles.group}>
        <div className={styles.field}> 
          <div className={styles.info}>
            Validação dos dados do utente{" "} 
          </div>
          <Switch
          
            className={styles.switch}
            value={resolution}
            onChange={Validacao}
          />
       
        </div>
           
        
        <div className={styles.field}>
          {valido >1 ?
          (<img src="/images/validado.png" width={"70px"} alt="Avatar" />):
        (
        <div className={styles.field1}>
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
          <button className={cn("button-stroke-red", styles.button)} onClick={RecusarProcesso}>Recusar validação</button>
        </div>
        )
          }
        </div>
        
      </div>
}
     
        
        <div className={styles.description}>
        <h2 className={styles.title} >Informações do Beneficiaro</h2><hr></hr>
          <div className={styles.group}>
          
          
          <TextInput
            className={styles.field}
            label="Nome"
            name="nome"
            type="text"
            required
            value={item.nome}
            ReadOnly
          />
          <TextInput
            className={styles.field}
            label="Data nascimento"
            name="data_nasc"
            type="text"
            required
            value={item.data_nasc}
            ReadOnly
          />
         
        <TextInput
            className={styles.field}
            label="NIF"
            name="nif"
            type="text"
            required
            value={item.nif}
            ReadOnly
          />
        
          <TextInput
            className={styles.field}
            label="Estado Civil"
            name="estado_civil"
            type="text"
            required
            value={item.estado_civil}
            ReadOnly
          />
        
          </div>
        </div>

        <div className={styles.description}>
        <h2 className={styles.title}>Escalão</h2><hr></hr>
          <div className={styles.group}>
          <TextInput
              className={styles.field}
              label="Escalão"
              name="esquema"
              type="text"
              required
              value={item.escalao}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Esquema"
              name="esquema"
              type="text"
              required
              value={item.esquema}
              ReadOnly
            />        
          </div>
        </div>
        <div className={styles.description}>
        <h2 className={styles.title}>Contribuições</h2><hr></hr>
          
        </div>

       <div className={styles.description}>
        <h2 className={styles.title}>Anexos</h2><hr></hr>
          <div className={styles.group}>
       {
        data.map((val, i)=>
     
        <div className={styles.col}>
       
            <div className={styles.row}>
            <button className={cn("button", styles.button)} onClick={()=>openFile(data[i].id)}>
              <span className={styles.field}>
                {data[i].tipo_anexo }
              </span>
            </button>
             
            </div>
          </div>
                 
        )
        
      }
      </div>
      </div>
      </Card>
  );
};
export default NameAndDescription;

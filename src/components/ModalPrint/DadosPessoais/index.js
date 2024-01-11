import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import axios from "axios";

import Switch from "../../Switch";
import Loader from "../../Loader";

const NameAndDescription = ({ className, item, id}) => {

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
        
      <div className={styles.description}>

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
       
       
      <h2 className={styles.title} >Primeiras Declarações</h2><hr></hr>
        <div className={styles.group}>
      
          <TextInput
            className={styles.field}
            label="Já esteve ,alguma vez ,inscrito na segurança Social"
            name="esta_instcrito"
            type="text"
            required
            value={item.esta_instcrito? "Sim" : "Não"}
            ReadOnly
          />
        
          <TextInput
            className={styles.field}
            label="Se sim diz o nome da Entidade Empregadora"
            name="empresa_que_trabalhou"
            type="text"
            required
            value={item.empresa_que_trabalhou}
            ReadOnly
          />
            <TextInput
            className={styles.field}
            label="Antigo NISS "
            name="codigo_antigo"
            type="text"
            required
            value={item.codigo_antigo}
            ReadOnly
          />
          </div>
        </div>
        
        <div className={styles.description}>
        <h2 className={styles.title} >Informações do Beneficiaro</h2><hr></hr>
          <div className={styles.group}>
          
          <TextInput
            className={styles.field}
            label="Tipo documento"
            name="nome_pai"
            type="text"
            required
            value={item.tipo_documento}
            ReadOnly
          />
          <TextInput
            className={styles.field}
            label="Nº Documento"
            name="sexo"
            type="text"
            required
            value={item.numero_documento}
            ReadOnly
          />
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
            label="Nome pai"
            name="nome_pai"
            type="text"
            required
            value={item.nome_pai}
            ReadOnly
          />
          <TextInput
            className={styles.field}
            label="Nome mãe"
            name="nome_mae"
            type="text"
            required
            value={item.nome_mae}
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
            label="Genero"
            name="sexo"
            type="text"
            required
            value={item.sexo}
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
          <TextInput
            className={styles.field}
            label="Nacionalidade"
            name="estado_civil"
            type="text"
            required
            value={item.nacionalidade}
            ReadOnly
          />
          </div>
        </div>
        <div className={styles.description}>
        <h2 className={styles.title} >Dados da conta bancaria</h2><hr></hr>
          <div className={styles.group}>
           
            <TextInput
              className={styles.field}
              label="Banco"
              name="banco"
              type="text"
              required
              value={item.banco}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="NIB"
              name="nib_conta"
              type="text"
              required
              value={item.nib_conta}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Nº Conta"
              name="n_conta"
              type="text"
              required
              value={item.n_conta}
              ReadOnly
            />
          </div>
        </div>
        <div className={styles.description}>
        <h2 className={styles.title} >Endereço</h2><hr></hr>
          <div className={styles.group}>
            
            <TextInput
              className={styles.field}
              label="Localidade"
              name="morada"
              type="text"
              required
              value={item.morada}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Nº Porta"
              name="numero_porta"
              type="text"
              required
              value={item.numero_porta}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Ponto referencia"
              name="ponto_referencia"
              type="text"
              required
              value={item.ponto_referencia}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Distrito"
              name="distrito"
              type="text"
              required
              value={item.distrito}
              ReadOnly
            />

          </div>
        </div>

        <div className={styles.description}>
        <h2 className={styles.title} >Contacto</h2><hr></hr>
          <div className={styles.group}>
            
            <TextInput
              className={styles.field}
              label="Contacto"
              name="tel"
              type="text"
              required
              value={item.tel}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Contacto Alternativo"
              name="Tel2"
              type="text"
              required
              value={item.tel2}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Caixa Postal"
              name="caixa_postal"
              type="text"
              required
              value={item.caixa_postal}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Email"
              name="email"
              type="text"
              required
              value={item.email}
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
            <TextInput
              className={styles.field}
              label="Periodo Contributivo"
              name="periodo"
              type="text"
              required
              value={item.periodo+' mes(es)'}
              ReadOnly
            />
          </div>
        </div>

        <div className={styles.description}>
        <h2 className={styles.title}>Situação Profissional</h2><hr></hr>
          <div className={styles.group}>
            <TextInput
              className={styles.field}
              label="Profição"
              name="proficao"
              type="text"
              required
              value={item.proficao}
              ReadOnly
            />
            <TextInput
              className={styles.field}
              label="Data do inicio da actividade"
              name="data_inicio_actividade"
              type="text"
              required
              value={item.data_inicio_actividade}
              ReadOnly
            />
          
        
        </div>
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

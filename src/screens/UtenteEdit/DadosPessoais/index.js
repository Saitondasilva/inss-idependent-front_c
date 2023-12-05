import React, { useState, useEffect, useRef} from "react";
//import { format } from 'date-fns';
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";
import Search from "../../AnaliseProgresso/Search";
import {useReactToPrint} from 'react-to-print';


// const optionsGenero      = ["Masculino", "Feminino", "Outro"];
// const optionsEstadocivil = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
const optionsLinguagem      = ["Português", "Inglês", "Françes", "Espanhol"];
const optionsNacionalidade  = ["Brasil", "Portugal", "França", "Espanha"];
// const optionsPais        = ["Brasil", "Portugal", "França", "Espanha"];

const NameAndDescription = ({ className, data1, setData1 }) => {
  const [content, setContent] = useState();
  const [optionsGenero, setOptionsGenero] = useState([]);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [generoID, setGeneroID] = useState([]);
  const [optionsEstadocivil, setOptionsEstadocivil] = useState([]);
  const [estadocivil, setEstadocivil] = useState(optionsEstadocivil[0]);
  const [estadocivilID, setEstadocivilID] = useState([]);
  const [nacionalidade, setNacionalidade] = useState(optionsNacionalidade[0]);
  const [optionsPais, setOptionsPais] = useState(['--Escolha um--', 'Santomense', 'estrangeiro']);
  const [pais, setPais] = useState(optionsPais[0]);
  const [paisID, setPaisID] = useState([]);
  const [optionsDocumento, setOptionsDocumento] = useState([]);
  const [documento, setDocumento] = useState(optionsDocumento[0]);
  const [documentoID, setDocumentoID] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current,
    documentTitle: 'emp-data',
    //onAfterPrint: ()=>alert('print sucess')
  
  });
 
  data1.descricao=content;
function read(){
  if(data1.id>0){
    // Documento
    console.log("tipo_documento=",data1)
    var position        =   documentoID.indexOf(data1.id_tipo_documento)
    setDocumento(optionsDocumento[position])
    //Estado Civil
    var position1        =   estadocivilID.indexOf(data1.id_estado_civil)
    setEstadocivil(optionsEstadocivil[position1])
    //Genero
    /*
    var position2        =   generoID.indexOf(data1.id_sexo)
    setGenero(optionsGenero[position2])
    alert(data1.id_sexo)*/
    //Nacionalidade
    var position3        =   paisID.indexOf(data1.id_nacionalidade)
    setGenero(optionsPais[position3])
  }
}

  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    var position        =   optionsGenero.indexOf(genero);
        data1.sexo_id=generoID[position];
  }, [genero]);

  useEffect(() => {
    var position        =   optionsEstadocivil.indexOf(estadocivil);
        data1.estadocivil_id  =   estadocivilID[position];
  }, [estadocivil]);

  useEffect(() => {
    var position        =   optionsPais.indexOf(pais);
        data1.pais_id  =   paisID[position];
  }, [pais]);

  useEffect(() => {
    var position        =   optionsDocumento.indexOf(documento);
        data1.id_tipo_documento  =   documentoID[position];
  }, [documento]);

  useEffect(() => {
    read()
  }, [data1]);
  function onChangeFile(e){
    let file = e.target.files
   /* data1.photo=this.state.image
    this.setState({
      photo: e.target.files[0]
  })
    console.log("FILE", this.state.image)*/
  }
  function getGenero(){
    return axios
    .get("/getGenero")
    .then((response) => {
      var a =new Array();
      var b =new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsGenero(a);
      setGeneroID(b);
      setGenero([optionsGenero[0]]);
     
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getEstadoCivil(){
    return axios
    .get("/getEstadoCivil")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsEstadocivil(a);
      setEstadocivilID(b);
      setEstadocivil([optionsEstadocivil[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getPais(){
    return axios
    .get("/country")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.countries.length; i++){
        a.push(response.data.data.countries[i].nome)
        b.push(response.data.data.countries[i].id)
      }
      setOptionsPais(a);
      setPaisID(b);
      setPais([optionsPais[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  function getTipoDoc(){
    return axios
    .get("/getTipoDocumentoUtente")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].descricao)
        b.push(response.data.data[i].id)
      }
      setOptionsDocumento(a);
      setDocumentoID(b);
      setDocumento([optionsDocumento[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {
    getGenero()
    getEstadoCivil()
    getPais()
    getTipoDoc()
    
  },[]);

 
  return (
    <Card
      className={cn(styles.card, className)}
      
      classTitle="title-green"      
    >
      <div ref={componentRef} style={{width: '100%', height: 'window.innerHeigh'}}>
      <div className={styles.t_print}>
        <h2>REPUBLICA DEMOCRÁTICA DE SÃO TOMÉ E PRINCIPE</h2>
        <img src="/images/n_logo_inss.png" width={50} height={50} alt="INSS" />
        <h3>INSTITUTO NACIONAL DE SEGURANÇA SOCIAL</h3>       
        
      </div>
    
      <div className={styles.description}><br></br><br></br>
      <div className={styles.p_corpo}>
      <p>Ao Beneficiário: {data1.nome}</p>
            <p>Residencia: {data1.morada    
            
            
            }</p>
            <p>Profissão: {data1.proficao}</p>

            <p>Assunto: Inscrição do Utente</p><br></br><br></br>
      
         <div className={styles.group}>
               
            <p>Serve a presente para comunicar a V.EX.cia que apartir de {data1.created_at} encontra-se inscrito(o) no Regime de Segurança Social dos
             Trabalhadores Independente sob o Número {data1.codigo}.</p>
            </div>
                <div className={styles.group}><br></br><br></br>
                  <p>Com os nossos melhores cumprimentos</p>
                </div>
                </div>
                <div className={styles.respon_p}>
                <div ><br></br><br></br>
                  <p>O Responsavel</p>
                  <br></br>
                 
                </div>                

                <div ><br></br>                  
                  <br></br>
                  <p>{data1.mae}</p>
                </div>
                <div ><br></br>
                  
                 <p>Data: {data1.created_at}</p>
                </div><br></br>
                </div>
                    
                    <div className={styles.foot_print}>
                    <hr></hr>
                <div ><br></br>
                  <i>Rua Engº Salustino da Graça Caixa Postal 145</i>
                </div>
                <div ><br></br>
                <i>Tel.2224603/fax 2234609</i>                                  
                </div>
                <div ><br></br>
                <i>Email:inss@cstome.net</i>                                  
                </div>
                <div ><br></br>
                <i>São Tomé e Príncipe </i>                               
                </div>
                </div>

      </div></div>
                <div className={styles.p_button}>

                <button onClick={handlePrint}>Imprimir</button>
                </div>
    </Card>
  );
};

export default NameAndDescription;

import React, { useState, useEffect } from "react";
import styles from "./CustomerList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Filters from "../../components/Filters";
import Settings from "./Settings";
import Table from "./Table";
import Panel from "./Panel";
import Details from "./Details";
import DadosPessoais from "./DadosPessoais";
import Products from "./Products";
import { useParams } from "react-router-dom";
import axios from "axios";

const navigation=["Perfil", "Anexos", "Agregado", "Contribuição" , "Prestação" , "Histórico"];
const CustomerList = ({ className, item}) => {

  //const [navigation, setnavigation]=useState(["Perfil", "Agregado", "Contribuição" , "Prestação" , "Histórico"]);
  //const [antigoNISS, setAntigoNISS] = useState(navigation[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [data1, setData1] = useState({});
  const [data, setData]=useState([])
  const [userData, setuserData] = useState({});
  const {id}=useParams();

  var user=null;
  useEffect(() => {
    user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    //shearchCliente(JSON.parse(user));
   if(id)GetUtenteById()
  },[]);

  const handleSubmit = (e) => {
    alert();
  };

 {/* useEffect(() => {
    read()
  },[data1]);

  function read(){

    if(data1.id>0){
      // Escalão
      data1.navigation!==null ? setAntigoNISS('Contribuição') : setAntigoNISS('Perfil')
     
    }
  }*/}
  function GetUtenteById() {
    return axios
      .get("/utente/getUtenteById/"+id)
      .then((response1) => {
       console.log("UTENTE ANTES",response1.data.data)
       const Utente = response1.data.data.Utente;
       setData1(Utente)
       console.log("UTENTE EDITAR",Utente)
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  };

  return (
    <>
      <Card
        className={styles.card}
        
        title="Histórico do Utente"
        classTitle={cn("title-purple", styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: visible })}
        >
        
          <>
          <div className={styles.link}>
          <p>Tipo Utente: Beneficiário</p>
          <hr></hr>
            <h4>Nº Utente: {data1.codigo} </h4>    
            <hr ></hr>
            <p>Nome: {data1.nif}</p>   
            <hr ></hr>
            <p>Data Nascimento: {data1.data_nasc}</p>  
            <hr ></hr>
            <p>Nome Pai: {data1.nome_pai}</p>  
            <hr ></hr>
            <p>Nome Mãe: {data1.nome_mae}</p>  
            <hr ></hr>
            <p>Escalão: {data1.escalao}</p>  
            <hr ></hr>
            <p>Esquema: {data1.esquema}</p>  
            <hr ></hr>
            <p>Estado: Activo</p>
            </div>
        <br></br><br></br>
      <h3>Menu</h3>
        
            <div className={styles.nav}>
              {navigation.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
           
          </>
          
      
      <br></br><br></br>
        <div className={cn(styles.row, { [styles.flex]: visible })}>
          { navigation[activeIndex]==="Contribuição"&&
          (
          <Products className={styles.card} data1={data1} setData1={setData1} />)}

        { navigation[activeIndex]==="Perfil"&&
          (
        <DadosPessoais className={styles.card} data1={data1} setData1={setData1} />
        
          )}
         {/* navigation[activeIndex]==="Agregado"&&
          (
        <DadosPessoais className={styles.card} data1={data1} setData1={setData1} />
        
          )*/}

          <Details
            className={styles.details}
            onClose={() => setVisible(false)}
          />
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default CustomerList;

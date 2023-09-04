import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../Icon";
import Overview from "./Overview";
import Products from "./Products";
import DadosPessoais from "./DadosPessoais";
import DadosBancario from "./DadosBancaria";
import DadosEndereco from "./Endereco";
import { useParams } from "react-router-dom";
import axios from "axios";

const navigation = ["Product", "Comments"];



const Details = ({ className, setValue, activeIndex, setActiveIndex }) => {
  const handleClick = (index) => {
    setActiveIndex(index);
    index === 0 && setValue(false);
    index === 1 && setValue(true);
  };


  const [startDate, setStartDate] = useState(new Date());
const [startTime, setStartTime] = useState(new Date());
const [userData, setuserData] = useState({});
const [data1, setData1] = useState({});
const {id}=useParams();


var user=null;
useEffect(() => {
  user = localStorage.getItem("userData");
  user==null?setuserData([]):setuserData(JSON.parse(user));
  //shearchCliente(JSON.parse(user));
},[]);
  function SaveProfissionalCliente() {
   
    var data={
      nome: data1.nome,
      nif: data1.nif,
      email: data1.email,
      caixa_postal: data1.caixa_postal,
      id_tipo_documento: data1.documento_id,
      numero_documento: data1.numero_documento,
      numero_porta: data1.N_porta,        
       
    
    }
    
    return axios
      .post("/utente/register",data,{
        headers: { Authorization: `Bearer ${userData.token}` },
      
      });
  };
  

  return (
    <div className={cn(styles.details, className)}>
    {/*  <div className={styles.head}>
        <div className={styles.nav}>
          {navigation.map((x, index) => (
            <button
              className={cn(styles.link, {
                [styles.active]: index === activeIndex,
              })}
              onClick={() => handleClick(index)}
              key={index}
            >
              {x}
            </button>
          ))}
        </div>
        <div className={styles.btns}>
          <button className={cn("button-stroke", styles.favorite)}>
            <Icon name="heart-fill" size="24" />
            <span>32</span>
          </button>
          <button className={cn("button", styles.buy)}>
            <span className={styles.price}>$89</span>
            <span className={styles.inner}>
              Download<span> now</span>
              <Icon name="download" size="24" />
            </span>
          </button>
        </div>
            </div>*/}
            <DadosPessoais id={id? Number.parseInt(id):null} data1={data1} setData1={setData1} />
     
      <DadosBancario id={id? Number.parseInt(id):null} data1={data1} setData1={setData1}/>
      <DadosEndereco id={id? Number.parseInt(id):null} data1={data1} setData1={setData1}/>
      {/*<Products />*/}
      
    </div>
  );
};

export default Details;

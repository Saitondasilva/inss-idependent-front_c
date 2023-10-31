import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../Icon";
import Overview from "./Overview";
import Products from "./Products";
import DadosPessoais from "./DadosPessoais";
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
const [data1, setData1] = useState({});
const [userData, setuserData] = useState({});


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
      id_tipo_documento: data1.id_tipo_documento,
      numero_documento: data1.numero_documento,
      numero_porta: data1.numero_porta,        
       
    
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
      <Overview />
      {/*<Products />*/}
      <DadosPessoais />
    </div>
  );
};

export default Details;

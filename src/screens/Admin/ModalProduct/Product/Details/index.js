import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";

import DadosPessoais from "./DadosPessoais";
import { useParams } from "react-router-dom";
import axios from "axios";
import Panel from "./Panel";

const navigation = ["Product", "Comments"];



const Details = ({ className, setValue, activeIndex, setActiveIndex }) => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data1, setData1] = useState({});
  const [userData, setuserData] = useState({});
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  
  const {id}=useParams();
  

  const handleClick = (index) => {
    setActiveIndex(index);
    index === 0 && setValue(false);
    index === 1 && setValue(true);
  };


 

var user=null;
useEffect(() => {
  
  SaveProfissionalCliente();
},[]);

  function SaveProfissionalCliente() {
   
    var data={
      nome: data1.utilizador,
      email: data1.email,
      password: data1.password,
      caixa_postal: data1.caixa_postal,       
    
    }
    
    return axios
    .post("/utente/register",data,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      setSmsSuccess("Registro com sucesso!");
      setSmsError("");
      setLoader(false)
      //clean();
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
            <DadosPessoais data1={data1} setData1={setData1} />
     
      
      {/*<Products />*/}  
      <Panel
    setVisiblePreview={setVisiblePreview}
    setVisibleSchedule={setVisibleModal}
    SaveProfissionalCliente={SaveProfissionalCliente}
  
    smsError={smsError}
    smsSucess={smsSucess}
    loader={loader}
    />    
    </div>
    

  );
};

export default Details;

import React, { useState, useEffect } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../Checkbox";
import ModalProduct from "../../ModalProduct";
import Icon from "../../Icon"; 
import Actions from "../../Actions";
import Modal from "../../Modal";
import Schedule from "../../Schedule";
import Control from "./Control";
import {useNavigate} from 'react-router-dom';
import { $CombinedState } from "redux";

const Row = ({ item, value, onChange, setActiveIndex }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [visibleModalSchedule, setVisibleModalSchedule] = useState(false);
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});

  useEffect(() => {
    var user = localStorage.getItem("userData"); 
    user==null?setuserData([]):setuserData(JSON.parse(user));
  },[]);
  const actions = [
    {
      title: "Schedule product",
      icon: "calendar",
      action: () => setVisibleModalSchedule(true),
    },
    {
      title: "Edit title & description",
      icon: "edit",
      action: () => console.log("Edit title & description"),
    },
    {
      title: "Delete forever",
      icon: "trash",
      action: () => console.log("Delete forever"),
    },
  ];
  function go_to(item){
    navigate("/contribuicao/utente/"+item.id_consulta,{replace: true})
    localStorage.setItem('SelectedClient',JSON.stringify(item))
    window.dispatchEvent(new Event('storage'))
    setActiveIndex(1)
    }
  const openFile = async (anexoId) => {
    try {

      // Faça a solicitação à API Laravel para baixar o arquivo
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/utente/anexo/contribuicao/${anexoId}`,{
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
  return (
     <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Checkbox
            className={styles.checkbox}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.col}>
          <div
            className={styles.item}
            onClick={() => go_to(item)}
           // onClick={() => setVisibleModalProduct(true)}
          >
            {/*
            <div className={styles.preview}>
              <img
                srcSet={`${"http://127.0.0.1:8000"+item.photo} 2x`}
                src={`${"http://127.0.0.1:8000"+item.photo}?w=500fit=crop&auto=format`}
                alt="Foto"
              />
            </div>
            */}
            <div className={styles.details} onClick={() => go_to(item)}>
              <div className={styles.product}>{item.codigo_transacao}</div>
              <div className={styles.wrap}>
                <div className={styles.category}>{item.nome}</div>
              </div>
            </div>
          </div>
         
        </div>
        <div className={styles.col}>
          {item.value > 0 ? (
            <div className={styles.link}>{item.data_transacao}</div>
          ) : (
            <div className={styles.link}>{item.data_transacao}</div>
          )}
        </div>
       
        <div className={styles.col}>
          <div className={styles.link}>{item.nif}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.link}>{item.codigo}</div>
        </div>
        <div className={styles.col}>
            <button className={cn("button button-small", styles.button)} onClick={()=>openFile(item.id)}>
              <span className={styles.field}>
              {item.forma_transacao}
              </span>
            </button>
        </div>
        <div className={styles.col}>
          <div className={styles.price}>{item.value}</div>
          
          <Control
            className={styles.control}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            id_do_contribute={item.id}
          />
          
          
        </div>
      </div>
      
    </>
  );
};

export default Row;

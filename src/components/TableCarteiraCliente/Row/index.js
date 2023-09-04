import React, { useState } from "react";
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
import { Link } from "react-router-dom";


const Row = ({ item, value, onChange ,setActiveIndex, setIdConsultaToNestStep, setVisibleModal}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [visibleModalSchedule, setVisibleModalSchedule] = useState(false);
  const navigate = useNavigate();

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
            onClick={() => setVisibleModalProduct(true)}
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
            <div className={styles.details} >
              <div className={styles.link}>{item.nome}</div>              
              
            </div>
          </div>
          
         
        </div>
        <div className={styles.col}>
            <div className={styles.link}>{item.data_nasc}</div>
        </div>
        <div className={styles.col}>
            <div className={styles.link}>{item.nif}</div>
        </div>
        <div className={styles.col}>
            <div className={styles.link}>{item.email}</div>
        </div>
        {/*<div className={styles.col}>
          <div className={styles.link}>Ativo</div>
        </div>*/}
        <div className={styles.col}>
          <div className={styles.link}>{item.email}</div>
        </div>
        <div className={styles.col}>
          <div className={styles.link}>{item.tel}</div>
        </div>
        <div className={styles.col}>
        {/*<Link className={styles.control}         
            to="/products/add/" >
           <Icon name="edit" size="20" /> 
      </Link> */}
          <Link className={styles.control}         
            to={`${"/products/editar/"+item.id}`}>
           <Icon name="edit" size="20" /> 
          </Link> 
        </div>                   
     
       <div className={styles.col} onClick={()=>setIdConsultaToNestStep(item.id_consulta)}>
          <Control
            className={styles.control}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            setVisibleModal={setVisibleModal}
            ModalProduct = {ModalProduct}            
          />
      </div> 
      
      </div>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
      {/*<Modal
        visible={visibleModalSchedule}
        onClose={() => setVisibleModalSchedule(false)}
      >
        <Schedule
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
        />
    </Modal>*/}
     
           
          
    </>
  );
};

export default Row;

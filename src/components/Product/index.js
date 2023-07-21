import React, { useState } from "react";
import cn from "classnames";
import styles from "./Product.module.sass";
import Control from "./Control";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import { Link } from "react-router-dom";

const Product = ({
  className,
  item,
  value,
  onChange,
  released,
  withoutСheckbox,
  setVisibleModal,
  setVisibleDelModal,
  setActualSessao,
  setVisibleVermaisModal,
  setIdToDel
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    onChange();
    setVisible(!visible);
  };

  return (
    <div
      className={cn(styles.product, className, { [styles.active]: visible })}
    >
      <div className={styles.preview}>
        <div className={cn(styles.control, className)}>
          <p>{item.descricao}</p>
          
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.title}>13/02/2023</div>
          <div className={styles.price} style={{cursor:"pointer"}} onClick={() => {setVisibleModal(true); setActualSessao(item)}}>
          <Icon name="plus-circle" size="22"/>Anotações</div>
      </div>
      {released ? (
        <div>
          {item.item.map((x, index) => (
            
          <div className={styles.date}>
              <Icon name="star-stroke" size="24" /> 
              {x.descricao }

                {/*
                <button className={styles.buttonR} onClick={() => {setIdToDel(x.id_consult_anotation);setVisibleDelModal(true)}}>
                  <Icon name="trash" size="20" />
                </button>
              */}
              
          </div>
          
          
          ))}
          <div className={styles.btns}>
            <Link className={styles.link} onClick={()=>{setVisibleVermaisModal(true);setActualSessao(item)}}>
              Ver mais
            </Link>
          </div>
          {/*
          item.arquive.map((x, index) => (
            <img width="200" height="200" src={x.arquive} alt="avatar"/>

          ))
          */}
        </div>
        
       
      ) : item.ratingValue ? (
        <div className={styles.rating}>
          <Icon name="star-fill" size="24" />
          {item.ratingValue}{" "}
          <span className={styles.counter}>({item.ratingCounter})</span>
        </div>
      ) : (
        <div className={cn(styles.rating, styles.ratingEmpty)}>
          <Icon name="star-stroke" size="24" />
          No ratings
        </div>
      )}
    </div>
  );
};

export default Product;

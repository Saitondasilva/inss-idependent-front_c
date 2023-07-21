import { useState } from "react";
import cn from "classnames";
import styles from "./Creator.module.sass";
import ModalProduct from "../../../components/ModalProduct";

import { numberWithCommas } from "../../../utils.js";

const Creator = ({ className, item, index,title }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  return (
    <>
    
      <div className={cn(styles.creator, className)}>
        <div className={styles.head}>
          <div className={cn("h3", styles.title)}>{title}</div>
          <div className={styles.user}> 
          {
          /**
          <div className={styles.avatar}>
              <img src={"http://127.0.0.1:8000"+item.photo} alt="Foto" />
            </div> 
           */
           }<div className={styles.details}>
              <div className={styles.line}>
                <div className={styles.man}>{item.first_name+' '+item.last_name}</div>
                {index < 3 && (
                  <div
                    className={styles.number}
                    style={{ backgroundColor: item.colorNumber }}
                  >
                    #{index + 1}
                  </div>
                )}
              </div>
              <div className={styles.parameters}>
                <div className={styles.parameter}>
                  <span>Valor da consulta:</span> x
                </div>
                {/*
                <div className={styles.parameter}>
                  <span>followers</span> followers
                </div>
                */
                }
                </div> 
            </div>
                
          </div>
         
        </div>
      </div>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default Creator;

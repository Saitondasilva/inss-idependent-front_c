import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../../components/Checkbox";
import Balance from "../../../../../components/Balance";
import ModalPrestacao from "../../../../../components/ModalPrestacao";
import Control from "../../Control";


import { numberWithCommas } from "../../../../../utils.js";

const Row = ({ item, value, onChange, up, id}) => {
  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  return (
    <>
    
      <div className={styles.row} onMouseLeave={() => setVisibleActions(false)}>
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
            onClick={() => setVisibleModalProduct(item.id)}
          >
            <div className={styles.details}>
              <div className={styles.product}>{item.nome}</div>
              <div className={styles.wrap}>
                <div className={styles.category}>{item.morada}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.col}>{item.codigo}</div>
        <div className={styles.col}>{item.id_processo}</div>
        <div className={styles.col}>{item.estado}</div>
        <div className={styles.col}>{item.created_at}</div>
        <div className={styles.col}>{item.descr_prestacao}</div>
       
       

        <div className={styles.col}>
        <Control 
            item={item}
            className={styles.control}
            visibleActions={visibleActions}
            setVisibleActions={setVisibleActions}
            up={up}
            id={item.id}
          />
          {/*item.status ? (
            <div className={cn("status-green", styles.status)}>Active</div>
          ) : (
            <div className={cn("status-red", styles.status)}>Deactive</div>
          )*/}
         
          </div>
          
      </div>
      
      <ModalPrestacao
        item={item}
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default Row;

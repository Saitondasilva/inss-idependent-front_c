import React, { useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../../components/Checkbox";
import Balance from "../../../../../components/Balance";
import ModalPrestacao from "../../../../../components/ModalPrestacao";
import Control from "../../Control";
import { useNavigate } from "react-router-dom";


import { numberWithCommas } from "../../../../../utils.js";

const Row = ({ item, value, onChange, up, id}) => {
  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const navigate = useNavigate();
  
    const handleImprimir = () => {
      navigate(`/imprimir-prestacao/${item.id}`); // Redireciona para página de impressão
    };

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
          <button onClick={handleImprimir}>Imprimir</button>
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

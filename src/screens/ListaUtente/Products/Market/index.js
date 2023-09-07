import React, { useState } from "react";
import styles from "./Market.module.sass";
// import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Icon from "../../../../components/Icon";
import Row from "./Row";

const Market = ({ items,id_estado_utente }) => {
  const [chooseAll, setСhooseAll] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  return (
    <div className={styles.market}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Checkbox
              className={styles.checkbox}
              value={chooseAll}
              onChange={() => setСhooseAll(!chooseAll)}
            />
          </div>
          <div className={styles.col}>Nome Beneficiário </div>          
          <div className={styles.col}>NISS</div>
          <div className={styles.col}>NIF</div>          
          <div className={styles.col}>Data Nascimento</div>
          <div className={styles.col}>Operação</div>
          
          
        </div>
        
        {items.map((x, index) => (
          id_estado_utente === 0 ?
          (<Row
            item={x}
            key={index}
            up={items.length - index <= 2}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />) :
          (x.id_estado === id_estado_utente &&
          <Row
            item={x}
            key={index}
            up={items.length - index <= 2}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />

          )
        ))}
      </div>
    
    </div> 
  );
};

export default Market;

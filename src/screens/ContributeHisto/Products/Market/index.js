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
          <div className={styles.col}>Escalão </div>          
          <div className={styles.col}>Ano</div>
          <div className={styles.col}>Mes</div>          
          <div className={styles.col}>Valor</div>
         
          
          
        </div>
        
        {items.map((x, index) => (
          // Listar todos caso o estado for 0
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

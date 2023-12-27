import React, { useState } from "react";
import styles from "./Market.module.sass";
// import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Icon from "../../../../components/Icon";
import Row from "./Row";

const Market = ({ items,id_prestacao }) => {
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
          <div className={styles.col}>Beneficiário/Contribuições</div>          
          <div className={styles.col}>NISS</div>
          <div className={styles.col}>Nº Processo</div>
          <div className={styles.col}>Estado</div>          
          <div className={styles.col}>Data Reg</div>          
          <div className={styles.col}>Tipo Prestação</div>            
          
        </div>
        
        {items.map((x, index) => (
          // Listar todos caso o estado for 0
          id_prestacao > 0 ?
          (x.id_prestacao === id_prestacao &&
            <Row
              item={x}
              key={index}
              up={items.length - index <= 2}
              value={selectedFilters.includes(x.id)}
              onChange={() => handleChange(x.id)}
            />) :
          (
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

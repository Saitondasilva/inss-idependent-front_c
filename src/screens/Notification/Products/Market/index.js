import React, { useState } from "react";
import styles from "./Market.module.sass";
// import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Icon from "../../../../components/Icon";
import Row from "./Row";

const Market = ({ items }) => {
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
          <div className={styles.col}>Nome Beneficiário</div>          
          <div className={styles.col}>NISS</div>
          <div className={styles.col}>NIF</div>
          <div className={styles.col}>Mãe</div>
          <div className={styles.col}>Pai</div>
          <div className={styles.col}>Estado</div>
          
        </div>
        {items.map((x, index) => (
          <Row
            item={x}
            key={index}
            up={items.length - index <= 2}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
      </div>
      <div className={styles.foot}>
        <button className={styles.arrow}>
          <Icon name="arrow-left" size="20" />
        </button>
        <button className={styles.arrow}>
          <Icon name="arrow-right" size="20" />
        </button>
      </div>
    </div> 
  );
};

export default Market;

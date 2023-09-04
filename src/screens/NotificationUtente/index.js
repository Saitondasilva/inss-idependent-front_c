
import React from "react";
import cn from "classnames";
import styles from "./ProductsDashboard.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
//import Overview from "./Overview";
//import ProductActivity from "./ProductActivity";
//import ProductViews from "./ProductViews";
import Products from "./Products";

const ProductsDashboard = () => {
  return (
    <>
      <div className={styles.section}>      
        <Products />
      </div>
      <TooltipGlodal />
    </>
  );
};

export default ProductsDashboard;

{/*import React, { useState } from "react";
import cn from "classnames";
import styles from "./Notification.module.sass";
import List from "./List";
import Filters from "./Filters";*/}

{/*const filters = [
  "Comments",
  "Likes",
  "Review",
  "Mentions",
  "Purchases",
  "Message",
];

const Notification = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [visible, setVisible] = useState(0);

  return (
    <div className={styles.row1}>
      <div className={styles.row1}>
        <List className={styles.card} />
      </div>
      {
      <div className={styles.col}>
        <Filters
          className={styles.filters}
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
      }
    </div>
  );
};

export default Notification;*/}

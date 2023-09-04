
import React from "react";
import cn from "classnames";
import styles from "./ProductsDashboard.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
//import Overview from "./Overview";
//import ProductActivity from "./ProductActivity";
//import ProductViews from "./ProductViews";
import Products from "./Products";
import List from "./List";

const ProductsDashboard = () => {
  return (
    <>
      <div className={styles.section}>      
      <List className={styles.card} />
      </div>
      <TooltipGlodal />
    </>
  );
};

export default ProductsDashboard;

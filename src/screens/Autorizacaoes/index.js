
import React from "react";
import cn from "classnames";
import styles from "./ProductsDashboard.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";

import Products from "./Products";

const ProductsDashboard = ({data1, setData1}) => {
  return (
    <>
      <div className={styles.section}>      
        <Products data1={data1} setData1={setData1} />
      </div>
      <TooltipGlodal />
    </>
  );
};

export default ProductsDashboard;

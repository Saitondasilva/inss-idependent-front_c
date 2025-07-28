
import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./ProductsDashboard.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";

import Products from "./Products";

const ProductsDashboard = () => {

  const [data1, setData1] = useState({});

  return (
    <>
      <div className={styles.section}>      
        <Products  data1={data1} setData1={setData1} />
      </div>
      <TooltipGlodal />
    </>
  );
};

export default ProductsDashboard;

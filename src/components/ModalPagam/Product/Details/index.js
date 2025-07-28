import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../Icon";


import { useParams } from "react-router-dom";
import axios from "axios";

const Details = ({ item,className, setValue, activeIndex, setActiveIndex }) => {
 
  return (
    <div className={cn(styles.details, className)}>
    {/*
 <DadosPessoais item={item} />

  */}
           
     
      
    </div>
  );
};

export default Details;

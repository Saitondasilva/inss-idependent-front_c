import React from "react";
import styles from "./ConfirmDialog.module.sass";
import cn from "classnames";
import Loader from "../../components/Loader";


const ConfirmDialog = ({delmessage,delresponse,setVisibleDelModal,action,loader}) => {

  return (
    <div >
      <div className={cn("h4", styles.info)}>Confirmação</div>
      <div className={styles.text}>
        {delmessage}
        
      </div>
      <div className={styles.foot}>
        {loader && <Loader className={styles.loader} />} 
        {delresponse}
        <button className={cn("button-stroke-green", styles.button)} onClick={action}>Sim</button>
        <button className={cn("button-stroke-red", styles.button)} onClick={()=>setVisibleDelModal(false)}>Não</button>
      </div>
      
    </div>
  );
};

export default ConfirmDialog;

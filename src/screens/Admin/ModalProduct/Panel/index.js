import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../../components/Icon";
import Loader from "../../../../components/Loader";

const Panel = ({setVisiblePreview, setVisibleSchedule, SaveUser, ClearProfissionalCliente, smsError, smsSucess, loader}) => {


  return (
    <div className={cn("")}>
      <div className={styles.info}>
        {loader && <Loader className={styles.loader} />} 
        {smsSucess!=="" && <p style={{color:"green"}}><Icon name="check-all" size="24" />{smsSucess}</p>}
        {smsError!=="" && <p style={{color:"red"}}><Icon name="close-circle" size="24" />{smsError}</p>}
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={SaveUser} >{/*<Icon name="add" size="24" />*/}Salvar  </button>        
      </div>
    </div>
  );
};

export default Panel;
import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../../components/Icon";
import Actions from "../../../../components/Actions";
import Loader from "../../../../components/Loader";

const Panel = ({setVisiblePreview, setVisibleSchedule, SavePagarContribuicao, ClearProfissionalCliente, smsError, smsSucess, loader}) => {


  return (
  
      <div className={styles.info}>
      
        {smsSucess!=="" && <p style={{color:"green"}}><Icon name="check-all" size="24" />{smsSucess}</p>}
        {smsError!=="" && <p style={{color:"red"}}><Icon name="close-circle" size="24" />{smsError}</p>}
      </div>
     
   
  );
};

export default Panel;

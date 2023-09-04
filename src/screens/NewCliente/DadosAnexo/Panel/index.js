import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../../components/Icon";
import Actions from "../../../../components/Actions";
import Loader from "../../../../components/Loader";

const Panel = ({setVisiblePreview, setVisibleSchedule, SavePagarContribuicao, ClearProfissionalCliente, smsError, smsSucess, loader}) => {


  return (
    <div className={cn("panel", styles.panel)}>
      <div className={styles.info}>
      
        {smsSucess!=="" && <p style={{color:"green"}}><Icon name="check-all" size="24" />{smsSucess}</p>}
        {smsError!=="" && <p style={{color:"red"}}><Icon name="close-circle" size="24" />{smsError}</p>}
      </div>
      {/*<div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={SavePagarContribuicao} ><Icon name="add" size="24" /> Enviar Pagamento </button>
       {/*<button className={cn("button", styles.button)} onClick={SaveProfissionalCliente}>Enviar para assinatura e gerar cobrança recorrente</button>
        <button className={cn("button", styles.button)} onClick={SaveProfissionalCliente}>Enviar para assinatura e gerar cobrança avulsa</button>
        
      </div>*/}
    </div>
  );
};

export default Panel;

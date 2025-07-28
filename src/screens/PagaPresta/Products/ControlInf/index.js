import React, { useState } from "react";
import styles from "./Control.module.sass";
import { Link} from "react-router-dom";

import cn from "classnames";
import Icon from "../../../../components/Icon";
import Actions from "../../../../components/Actions";
import Modal from "../../../../components/Modal";
import ModalPrint from "../../../../components/ModalPrint";
import Success from "./../Control/Overview/Success";



const Control = ({item, className, visibleActions, setVisibleActions, up, id}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalp, setVisibleModalp] = useState(false);
  const [data1, setData1] = useState({});
  const [data, setData]=useState([])
  const history = useState();
  
  return (
    <div className={cn(styles.control, className)}>
      <button className={styles.button} >    
          <Link className="{style.control}"           
           to={"/Prestacao/Print/"+id}>
           <Icon name="edit" size="20" />  
          </Link>         
      </button>
      
     
       <Modal
        outerClassName={styles.outer}
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      >
        <Success className={styles.card} data1={data1} setData1={setData1} item={item}/>
      </Modal>

      <ModalPrint
        outerClassName={styles.outer}
        visible={visibleModalp}
        onClose={() => setVisibleModalp(false)}
      >
        <Success className={styles.card} data1={data1} setData1={setData1} item={item}/>
      </ModalPrint>
    </div>

    
  );
};

export default Control;

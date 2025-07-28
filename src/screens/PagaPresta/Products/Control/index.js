import React, { useState } from "react";
import styles from "./Control.module.sass";
import { Link } from "react-router-dom";
import cn from "classnames";
import Icon from "../../../../components/Icon";

import Modal from "../../../../components/Modal";
import ModalPrint from "../../../../components/ModalPrint";
import Success from "./../Control/Overview/Success";
import Switch from "../../../../components/Switch";

import axios from "axios";

const Control = ({item, className, visibleActions, setVisibleActions, up, id}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalp, setVisibleModalp] = useState(false);
  const [data1, setData1] = useState({});
  const [data, setData]=useState([])

  const [resolution, setResolution] = useState(false);
  const [userData, setuserData] = useState({});
  const [valido, setValido] = useState(item.id_estado);

 

  function Validacao(){
    if(resolution)return false;
    var confirmed = window.confirm('Tem certeza que desejas calcular esse processo?');
    if(confirmed){
        return axios
        .get("/utente/validarUtente/"+item.id,{
          headers: { Authorization: `Bearer ${userData.token}`},
        })
        .then((response) => {
          const rs = response.data.data.Utente
          setValido(rs.id_estado);
          if(rs.id_estado>1)setResolution(true)
        })
        .catch((err) => {
          console.log("Error", err);
          return err.response;
        });

    }   
  }
    
  return (

    
    <div className={cn(styles.control, className)}>
       <Switch            
              className={styles.switch}
              value={resolution}
              onChange={Validacao}
            />     
      
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

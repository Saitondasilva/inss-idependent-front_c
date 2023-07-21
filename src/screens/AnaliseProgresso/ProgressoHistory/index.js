import React, {useState,useEffect} from "react";
import cn from "classnames";
import styles from "./PayoutHistory.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import { numberWithCommas } from "../../../utils.js";
import axios from "axios";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";

const ProgressoHistory = ({ className }) => {
  const [items, setItems] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [visibleDelModal, setVisibleDelModal] = useState(false);
  const [delmessage, setDelmessage] = useState("Tem certeza que deseja apagar essa informação?");
  const [delresponse, setDelresponse] = useState();
  const [idToDel, setIdToDel] = useState(0);
 
  let cliente=[]
  try{
     cliente=JSON.parse(localStorage.getItem("SelectedClient"));
  }catch(exceptionVar){
    cliente=[]
  }
  
  useEffect(() => {
    getProgressoCliente();
  }, []);
  
  
  function getProgressoCliente(){
    var id_consulta=0;
    if(cliente)id_consulta=cliente.id_consulta;
    const result= axios
      .get("/candidate/getProgressoCliente/"+id_consulta)
      .then((response) => {
        console.log(response);
        setItems(response.data.data.Progresso)
        return response;
        
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
};
function delProgressoCliente(id){
  setLoader(true)
  const result= axios
    .delete("/candidate/delProgressoCliente/"+id)
    .then((response) => {
      console.log(response);
      getProgressoCliente();
    }).then((response)=>{
      setLoader(false)
    }).then((response)=>{
      setVisibleDelModal(false)
    })
    .catch((err) => {
      console.log("Error", err);
      setDelresponse(err.data.message)
      return err.response;
    });
    return result;
};
  return (
    <Card
      className={cn(styles.card, className)}
      title="Lista de Progressos"
      classTitle="title-blue"
    >
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>Data</div>
            <div className={styles.col}>Receita</div>
            <div className={styles.col}>Saldo</div>
            <div className={styles.col}>Divida</div>
            <div className={styles.col}>P. Financeiro</div>
            <div className={styles.col}>P. Imobiliario</div>
            <div className={styles.col}>Eliminar</div>
           
          </div>
          {items.map((x, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.col}>{x.data}</div>
              <div className={styles.col}>{x.receita}</div>
              <div className={styles.col}>{x.saldo}</div>
              <div className={styles.col}>{x.divida}</div>
              <div className={styles.col}>{x.patrimonio_financeiro}</div>
              <div className={styles.col}>{x.patrimonio_imobiliario}</div>
              <div className={styles.col}>
                <button className={cn("button-stroke-red", styles.button)} onClick={()=>{setIdToDel(x.id); setVisibleDelModal(true)}}>
                <Icon name="trash" size="24" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal 
        outerClassName={styles.outer}
        visible={visibleDelModal}
        onClose={() => setVisibleDelModal(false)}
        >
        <ConfirmDialog 
          delmessage={delmessage}
          delresponse={delresponse}
          setVisibleDelModal={setVisibleDelModal}
          action={()=>delProgressoCliente(idToDel)}
          loader={loader}
        />
      </Modal>
    </Card>
  );
};

export default ProgressoHistory;

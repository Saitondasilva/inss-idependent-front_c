import React, { useState, useEffect } from "react";
import styles from "./NewProduct.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import EditarDadosPessoais from "./EditarDadosPessoais";
import ImagesAndCTA from "./ImagesAndCTA";
import EditarDadosBanco from "./EditarDadosBanco"
import EditarDadosEndereco from "./EditarDadosEndereco"
import EditarDadosContactos from "./EditarDadosContactos"
import EditarDadosProf  from "./DadosProfissi"
import EditarDadosOuDec from "./DadosOutraDec"
import Preview from "./Preview";
import Panel from "./Panel";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewProduct = () => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data1, setData1] = useState({});
  const {id}=useParams();

  
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [produto1, setProduto1] = useState([]);
  const [nome, setNome] = useState();
  const [userData, setuserData] = useState({});
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState("");
 
 
  var user=null;

  useEffect(() => {
    user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    //shearchCliente(JSON.parse(user));
  },[]);

  


{/*function GetAllCliente() {
    return axios
      .get("/utente/getAllUtente"+id_Edit_ut)
      .then((response) => {
       console.log(response.data.data)
       setProduto1(response.data.data.Utente);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });

      
};*/}
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <EditarDadosPessoais className={styles.card} id={id? Number.parseInt(id):null} data1={data1} setData1={setData1} />
          <EditarDadosBanco className={styles.card} id={id? Number.parseInt(id):null} data1={data1} setData1={setData1} />
          <EditarDadosEndereco className={styles.card} id={id? Number.parseInt(id):null} data1={data1} setData1={setData1} />
          <EditarDadosContactos className={styles.card} data1={data1} setData1={setData1} />
          <ImagesAndCTA className={styles.card} id={id? Number.parseInt(id):null} data1={data1} setData1={setData1} />   
          <EditarDadosProf className={styles.card} id={id? Number.parseInt(id):null} data1={data1} setData1={setData1} />
          <EditarDadosOuDec className={styles.card} id={id? Number.parseInt(id):null} data1={data1} setData1={setData1} />
         
        </div>
        <div className={styles.col}>
          <Preview
            visible={visiblePreview}
            onClose={() => setVisiblePreview(false)}
          />
        </div>
      </div>
      <Panel
        setVisiblePreview={setVisiblePreview}
        setVisibleSchedule={setVisibleModal}
      />
      <TooltipGlodal />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Schedule
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
        />
      </Modal>
    </>
  );
};

export default NewProduct;

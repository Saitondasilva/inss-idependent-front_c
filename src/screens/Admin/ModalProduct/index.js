import React, { useCallback, useEffect,useState } from "react";

import { createPortal } from "react-dom";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./ModalProduct.module.sass";
import Icon from "../../../components/Icon";
import Product from "./Product";
import DadosPessoais from "./DadosPessoais";
import Panel from "./Panel";
import axios from "axios";

const ModalProduct = ({ visible, onClose }) => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData]=useState([])
  const [data1, setData1] = useState({});
  const [userData, setuserData] = useState({});
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [loader, setLoader] = useState("");

  var user=null;
  useEffect(() => {
    user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));    
   
  },[]);

  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    if (visible) {
      const target = document.querySelector("#modal-product");
      disableBodyScroll(target);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [visible]);


  function validateForm(){
    //Validação de Dados do Utente 
    if(!data1.utilizador || data1.utilizador===""){
      setSmsError("Por favor preencha o nome do Utilizador")
      return false;
    }
    if(!data1.email || data1.email===""){
      setSmsError("Por favor preencha o Email")
      return false;
    }   
    if(!data1.password || data1.password===""){
      setSmsError("Campo Palavra passe obrigatório")
      return false;
    }      
  }

  function ConfirmarSenha() {

    if(data1.password !== data1.repassword ){
      setSmsError("A confirmação de senha não coincide com a senha.")
      return false;
    }  
    else
    {
      setSmsError("")
      return true;
    } 
  }
  
  function SaveUser() {
    setLoader(true)
   
    if(!validateForm() && !ConfirmarSenha()){setLoader(false); return false;}
    
    var data3={
      name: data1.utilizador,
      email: data1.email,
      password: data1.password,
      type_id: data1.type_id 
   
    }    
    return axios
    .post("/user/register",data3,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      setSmsSuccess("Registro com sucesso!");
      setSmsError("");
      setLoader(false)
      clean();
      console.log(response.data.data)
    })
    .catch((err) => {
      setLoader(false);
      setSmsSuccess("");
      setSmsError(err.response.data.message);
      console.log("Error", err);
      return err.response;
    });
  };

  function clean(){
    data1.utilizador="";
    data1.nif="";
    data1.email="";
    data1.caixa_postal="";   
    
    setData(null)
    }

  return createPortal(
    visible && (
      <div id="modal-product" className={styles.modal}>
        <div className={styles.control}>
        { /* <Link
            className={cn("button-white", styles.button)}
            to="/products/add"
          >
            Edit product
    </Link>*/}
          <button className={styles.close} onClick={onClose}>
            <Icon name="close" size="20" />
          </button>
        </div>
        <div className={styles.outer}>
          {/*<Product />*/}
          <DadosPessoais data1={data1} setData1={setData1} />
        
            <Panel
                setVisiblePreview={setVisiblePreview}
                setVisibleSchedule={setVisibleModal}
                SaveUser={SaveUser}
              
                smsError={smsError}
                smsSucess={smsSucess}
                loader={loader}
    /> </div>
      </div>
    ),
    document.body
  );
};

export default ModalProduct;

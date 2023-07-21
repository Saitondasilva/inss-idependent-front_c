import React, {useState} from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Code = ({data1, setData1}) => {
  const navigate = useNavigate();
  const [sms, setSms] = useState();
  const [loader, setLoader] = useState();
  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
function ConfirmEmail(){
  setLoader(true)
  var data={
    email: data1.email,
    code: data1.number1+data1.number2+data1.number3+data1.number4
  }
  return axios
    .post("/confirmEmail",data)
    .then((response) => {
      console.log(response.data.data);
      navigate("/sign-in")
    })
    .catch((err) => {
      setLoader(false)
      setSms("Codigo digitado está incorecto")
      console.log("Error", err);
      return err.response;
    });
    
}
  return (
    <div className={styles.code} style={{width: "380px"}}>
      <div className={styles.body}>
        <div className={styles.info}>
          Nós enviamos para o seu email o codigo de verificação. Verifica na sua caixa de entrada ou span
        </div>
        <div className={styles.fieldset}>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number1"
              type="tel"
              autocomplete="off"
              required
              onChange={onChangeData}
              value={data1.number1}
            />
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number2"
              type="tel"
              autocomplete="off"
              required
              onChange={onChangeData}
              value={data1.number2}
            />
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number3"
              type="tel"
              autocomplete="off"
              required
              onChange={onChangeData}
              value={data1.number3}
            />
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              name="number4"
              type="tel"
              autocomplete="off"
              required
              onChange={onChangeData}
              value={data1.number4}
            />
          </div>
          
        </div>
        <div className={styles.errorNote}>
          {loader && <Loader className={styles.loader} white />}
          {sms}
        </div>
        <button className={cn("button", styles.button)} onClick={ConfirmEmail}>
          
          <span>Continue</span>
        </button>
        {/*
        <div className={styles.note}>
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </div>
  */}
      </div>
    </div>
  );
};

export default Code;

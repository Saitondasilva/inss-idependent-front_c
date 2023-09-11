import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";
import axios from "axios";
import Loader from "../../components/Loader";
import Dropdown from "../../components/Dropdown";
import Radio from "../../components/Radio";
import {useDispatch} from "react-redux"

const optionsPurchase = ["Sou cliente", "Sou profissional","Sou Empresa"];
const optionsPurchaseID = [1, 2, 3];

const SignIn = () => {
  const heightWindow = use100vh();
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [data1, setData1] = useState({});
  const [radioType, setRadioType] = useState({});
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [purchase, setPurchase] = useState(optionsPurchase[0]);
  const dispatch = useDispatch();
  
  console.log("userData=========",localStorage.getItem("userData"))
  function validateEmail() {
    let formIsValid = false;
    if (!data1.email) {
      formIsValid = false;
      seterroremail("*Por favor introduza seu email");
    } else if (typeof email !== "undefined") {
      if (
        !data1.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        formIsValid = false;
        seterroremail("*Por favor introduz um email valido");
      } else {
        formIsValid = true;
        seterroremail("");
      }
    } else {
      formIsValid = true;
      seterroremail("");
    }
    return formIsValid;
  }
  function validatePassword() {
    let formIsValid = false;
    if (!data1.password) {
      seterrorpassword("*Introduza a sua senha.");
      formIsValid = false;
    } else {
      seterrorpassword("");
      formIsValid = true;
    }
    return formIsValid;
  }
  function validateForm() {
    let email = validateEmail();
    let pass = validatePassword();
    let valid = email && pass;
    return valid;
  }
  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    var position    =   optionsPurchase.indexOf(purchase);
    data1.id_type  =   optionsPurchaseID[position];
  }, [purchase]);


  function login() {
    seterroremail("")
    seterrorpassword("")
    setLoader(true)
    if(!validateForm()){
      setLoader(false)
      return false;
    } 
 
   var data = {
      email: data1.email,
      password: data1.password,
      id_type: data1.id_type
    };
      return axios
        .post("/login", data)
        .then((response) => {
           const token  =   response.data.data.token;
           const user   =   response.data.data;
          
          localStorage.setItem('token', token);
          localStorage.setItem('userData', JSON.stringify(user));
          
        //user.isAuthenticated=true;

         dispatch({ type: 'login', playload: user } )
          console.log(token);
          console.log(user);
          
          navigate("/home");
        
          return response;
          
        })
        .catch((err) => {
          setLoader(false)
          console.log("Error", err);
          seterrorpassword(err.response.data.message)
          return err.response;
        });
  };

  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
      <div className={styles.wrapper}>
        {/*
          <Image
            className={styles.pic}
            src="/images/n_logo_inss.png"
            srcDark="/images/n_logo_inss.png"
            alt="SITI"
          />
          */}
        
        <div className={cn("h2", styles.title)}>SITI</div>
        <div className={styles.head}>
          <div className={styles.subtitle}>Sistema Integrado do Trabalhador Idependente</div>
          
            
           
           
        </div>
        <div className={styles.body}>
          <div className={styles.subtitle}></div>
        
          <TextInput
            className={styles.field}
            name="email"
            id="email"
            type="email"
            placeholder="Your email"
            required
            icon="mail"
            onChange={onChangeData}
            value={data1.email}
          /><span className={styles.error}>{erroremail}</span>
          <TextInput
            className={styles.field}
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            required
            icon="lock"
            onChange={onChangeData}
            value={data1.password}
          /><span className={styles.error} >{errorpassword}</span>
          {loader && <Loader className={styles.loader} />} 
          <button onClick={login} className={cn("button", styles.button)} >Logar</button>
          
          
        </div>
      </div>
    </div>
  );
};

export default SignIn;

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
    } else if (data1.password.length < 6) {
      seterrorpassword("*Introduza uma senha com mais de 6 caracteres");
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
        .post("/candidate/login", data)
        .then((response) => {
           const token  =   response.data.data.token;
           const user   =   response.data.data;
          
          localStorage.setItem('token', token);
          localStorage.setItem('userData', JSON.stringify(user));
          
        //user.isAuthenticated=true;

         dispatch({ type: 'login', playload: user } )
          console.log(token);
          console.log(user);
          if(data1.id_type===2)
          navigate("/home");
          if(data1.id_type===1)
          navigate("/busca/profissional");
          return response;
          
        })
        .catch((err) => {
          setLoader(false)
          console.log("Error", err);
          seterrorpassword(err.response.data.message)
          return err.response;
        });
  };

  
  function loginGoogle() {

      return axios
        .post("/google/login")
        .then((response) => {
           const token  =   response.data.data.token;
           const user   =   response.data.data;
          
          localStorage.setItem('token', token);
          localStorage.setItem('userData', JSON.stringify(user));
      
         dispatch({ type: 'login', playload: user } )
          console.log(token);
          console.log(user);
          if(data1.id_type===2)
          navigate("/home");
          if(data1.id_type===1)
          navigate("/busca/profissional");
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
        <Link className={styles.logo}>
          <Image
            className={styles.pic}
            src="/images/logo-finmap-site1.svg"
            srcDark="/images/logo-finmap-site1.svg"
            alt="Core"
          />
        </Link>
        {/*<div className={cn("h2", styles.title)}>Login</div>*/}
        <div className={styles.head}>
          <div className={styles.subtitle}>Continue com a sua conta:</div>
          <div className={styles.btns}>
            
              <button className={cn("button-stroke", styles.button)}>
                <img src="/images/content/google.svg" alt="Google" />
                Google
              </button>
           
            <button className={cn("button-stroke", styles.button)}>
              <Image
                className={styles.pic}
                src="/images/content/apple-dark.svg"
                srcDark="/images/content/apple-light.svg"
                alt="Apple"
              />
              Apple ID
            </button>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.subtitle}></div>
          {/*
          <Dropdown
          className={styles.field}
          value={purchase}
          setValue={setPurchase}
          options={optionsPurchase}
        /> 
        */}
        <Radio
        className={styles.radio}
        name="id_type"
        value={radioType.cliente}
        onChange={() => data1.id_type=1}
        content="Cliente"
      />
      <Radio
        className={styles.radio}
        name="id_type"
        value={radioType.profissional}
        onChange={() => data1.id_type=2}
        content="Profissional"
      />
      <Radio
        className={styles.radio}
        name="id_type"
        value={radioType.empresa}
        onChange={() => data1.id_type=3}
        content="Empresa"
      />
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
          
          <div className={styles.note}>
            <span>
            <Link className={styles.link} to="/sign-in"> Politica de Privacidade </Link>
            e
            <Link className={styles.link} to="/sign-in"> Temos de Uso </Link>             
            </span>
          </div>
          
          <div className={styles.info}>
            Ainda não tem conta?{" "}
            <Link className={styles.link} to="/sign-up">
              Registrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

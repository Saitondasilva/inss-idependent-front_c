import React, { useState } from "react";
import cn from "classnames";
import styles from "./SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Entry from "./Entry";
import Code from "./Code";
import Image from "../../components/Image";
import NewCliente from "../../screens/NewCliente";

const items = [
  "Cuidado com a saúde mental e emocional",
  "Orientações sem conflitos de interesses",
  "Realização de sonhos sem pesadelos",
  "Cursos online nem sempre funcionam",
];

const SignUp = () => {
  const [visible, setVisible] = useState(true);
  const heightWindow = use100vh();
  const [data1, setData1] = useState({});

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={styles.preview}>
            <img src="/images/logo-finmap-site.svg" alt="Finmap" />
          </div>
          <div className={cn("h4", styles.subtitle)}>Por que buscar auxílio de um profissional?</div>
          <ul className={styles.list}>
            {items.map((x, index) => (
              <li key={index}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.col} style={{ minHeight: heightWindow }}>
        <div className={styles.head}>
          
          <div className={styles.info}>
            Ja é membro ?{" "}
            <Link className={styles.link} to="/sign-in">
              Logar
            </Link>
          </div>
        </div>
        <div className={styles.wrapper}>
        
          
          <div className={cn("h2", styles.title)}>Registrar</div>
          {visible ? <Entry onConfirm={() => setVisible(false)} data1={data1} setData1={setData1} /> : <Code data1={data1} setData1={setData1}/>}
            
        </div>
      </div>
    </div>
  );
};

export default SignUp;

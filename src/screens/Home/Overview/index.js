import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Item from "./Item";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Users from "../../../components/Users";
import Chart from "./Chart";
import axios from "axios";

const intervals = [];

const Overview = ({ className,userData }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexK, setActiveIndexK] = useState(1);

 const [TCountCarteira,setTCountCarteira]= useState(0);
 const [TCountTurma,setTCountTurma]= useState(0);
 const [TCountContratoPendente,setTCountContratoPendente] = useState(0);
 const [TCountContratoActivo,setTCountContratoActivo] = useState(0);
  useEffect(() => {

      CountCarteira(userData);
      CountTurma(userData);
      CountContratoPendente(userData);
      CountContratoActivo(userData);
  },[]);
  const nav = [
    {
      title: "Total de utentes idependentes",
      counter: TCountCarteira,
      icon: "shopping-bag",
      color: "#B1E5FC",
    },
    {
      title: "Total de Devedores",
      counter: TCountTurma,
      icon: "shopping-bag",
      color: "#B1E5FC",
    },
    
  ];
  const nav2 = [
    
    {
      title: "Pag. aguardando confirmação",
      counter: TCountContratoPendente,
      icon: "shopping-bag",
      color: "#B1E5FC",
    },
    {
      title: "Pag. Não Aprovados",
      counter: TCountContratoActivo,
      icon: "shopping-bag",
      color: "#B1E5FC",
    },
    
  ];
  function CountCarteira(user) {
    return axios
      .get("/candidate/CountCarteira/"+user.id)
      .then((response) => {
        setTCountCarteira(response.data.data.Total);
        
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  };
  function CountTurma(user) {
    return axios
      .get("/candidate/CountTurma/"+user.id)
      .then((response) => {
     
        setTCountTurma(response.data.data.Total);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  };
  function CountContratoPendente(user) {
    return axios
      .get("/candidate/CountContratoPendente/"+user.id)
      .then((response) => {
     
        setTCountContratoPendente(response.data.data.Total);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  };
  function CountContratoActivo(user) {
    return axios
      .get("/candidate/CountContratoActivo/"+user.id)
      .then((response) => {
     
        setTCountContratoActivo(response.data.data.Total);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Estatística"
      classTitle="title-red"
      head={
        <Dropdown
          className={styles.dropdown}
          classDropdownHead={styles.dropdownHead}
          value={sorting}
          setValue={setSorting}
          options={intervals}
          small
        />
      }
    >
      <div className={styles.overview}>
        <div className={styles.nav}>
          {nav.map((x, index) => (
            <Item
              className={cn(styles.item, {
                [styles.active]: index === activeIndex,
              })}
              key={index}
              onActive={() => {setActiveIndex(index);setActiveIndexK(3);}}
              item={x}
            />
          ))}
        </div>
        <div className={styles.nav}>
          {nav2.map((x, index) => (
            <Item
              className={cn(styles.item, {
                [styles.active]: index === activeIndexK,
              })}
              key={index}
              onActive={() => {setActiveIndexK(index); setActiveIndex(3);}}
              item={x}
            />
          ))}
        </div>
        {/*
        <div className={styles.body}>
          {activeIndex === 0 && <Users />}
          {activeIndex === 1 && <Chart />}
        </div>
        */}
      </div>
    </Card>
  );
};

export default Overview;

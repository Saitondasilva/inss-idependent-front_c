import React, { useState,useEffect } from "react";
import cn from "classnames";

import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import Table from "../../components/TableAdmin";
import Product from "../../components/Product";
import Loader from "../../components/Loader";

import axios from "axios";
import styles from "./Overview.module.sass";
//import Modal from "../../components/Modal";
import ModalProduct from "./ModalProduct";

// data
//import { products } from "../../mocks/products";


const colluns =["Nome","Email", "Data Nascim.", "Estado"];


const Scheduled = () => {
  const [search, setSearch] = useState();
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  const [products, setProducts] = useState([]);
  const [userData, setuserData] = useState({});

  const handleSubmit = (e) => {
    alert();
  };

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    getAdmins();
    console.log("Login Information")
    console.log(user);

  },[]);
  function getAdmins(){
       const result=axios
         .get("/getAllUsers")
         .then((response) => {
      
          setProducts(response.data.data.User);
         // console.log(products);
         })
         .catch((err) => {
           console.log("Error", err);
           return err.response;
         });
    return result;
   };
  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Utilisadores"
        classTitle={cn("title-purple", styles.title)}> 
        
          <div className={styles.overview}>
          {<div className={styles.list}>
          <Form
            className={styles.form}
            
            value={search}
            setValue={setSearch}
            onSubmit={() => handleSubmit()}
            placeholder="Search Utilizador"
            type="text"
            name="search"
            icon="search"
          /> 
            {/*items.map((x, index) => (
              <div className={styles.item} key={index}>
                <div
                  className={styles.icon}
                  style={{ backgroundColor: x.color }}
                >
                  <Icon name={x.icon} size="24" />
            </div>
                <div className={styles.details}>
                  <div className={styles.label}>
                    {x.title}
                    <Tooltip
                      className={styles.tooltip}
                      title={x.tooltip}
                      icon="info"
                      place="top"
                    />
                  </div>
                 { /*<div className={styles.counter}>{x.counter}</div>
                </div>
              </div>
            ))*/}
            </div>}
          <button
            className={cn("button", styles.button)}
            onClick={() => setVisibleModalProduct(true)}
          >
            Novo Utilizador
          </button>
        </div>
       
        <div className={styles.wrapper}>
          <Table items={products} colluns={colluns} title="Scheduled for" />
        </div>
      </Card>

  

      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
      {/*<Panel/>*/}
    </>
  );
};

export default Scheduled;

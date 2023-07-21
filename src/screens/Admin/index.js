import React, { useState,useEffect } from "react";
import cn from "classnames";
import styles from "./Scheduled.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import Table from "../../components/TableAdmin";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Panel from "./Panel";
import axios from "axios";

// data
//import { products } from "../../mocks/products";


const colluns =["Foto","Nome","Email", "Data reg."];


const Scheduled = () => {
  const [search, setSearch] = useState("");

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
         .get("/admin/simple/"+userData.id,{
          headers: { Authorization: `Bearer ${userData.token}` },
        })
         .then((response) => {
          
          setProducts(response.data.data);
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
        classTitle={cn("title-purple", styles.title)}
        head={
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={() => handleSubmit()}
            placeholder="Search product"
            type="text"
            name="search"
            icon="search"
          />
        }
      > 
        <div className={styles.wrapper}>
          <Table items={products} colluns={colluns} title="Scheduled for" />
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default Scheduled;

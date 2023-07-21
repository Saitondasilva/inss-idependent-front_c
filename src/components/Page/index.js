import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Page.module.sass";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Creator from "./Creator";

const Page = ({ wide, children, title,showCreator }) => {
  const [visible, setVisible] = useState(false);
  const [creators, setCreators] = useState(null);
  const [userData, setUserData] = useState({});

 
  function getSelectedClient(){
    var cliente=JSON.parse(localStorage.getItem("SelectedClient"));
    if(cliente!=null)
    setCreators(cliente);
    console.log("getSelectedClient",cliente)
  }
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")))
    if(showCreator===1)
     getSelectedClient()
   },[]);
 
   onstorage = (event) => {
    //setCreators(JSON.parse(localStorage.getItem("SelectedClient")));
    getSelectedClient()
    //alert()
  };
  
  
  return (
    <>
      <div className={styles.page}>
        <Sidebar
          className={cn(styles.sidebar, { [styles.visible]: visible })}
          onClose={() => setVisible(false)}
        />
        <Header onOpen={() => setVisible(true)} userData={userData}/>
        <div className={styles.inner}>
          <div
            className={cn(styles.container, {
              [styles.wide]: wide,
            })}
          >
            {(creators!=null & showCreator===1)  ? (
              <>
              <Creator
                className={styles.creator}
                item={creators}
                index={0}
                key={0}
                title={title}
              />
              </>):
              (<div className={cn("h3", styles.title)} >{title}</div>)
           
            
            }
            
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
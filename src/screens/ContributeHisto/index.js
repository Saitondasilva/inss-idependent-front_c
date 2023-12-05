import React, { useState, useEffect } from "react";
import styles from "./CustomerList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Filters from "../../components/Filters";
import Settings from "./Settings";
import Table from "./Table";
import Panel from "./Panel";
import Details from "./Details";
import DadosPessoais from "./DadosPessoais";


const navigation=["Perfil", "Agregado", "Contribuição" , "Prestação" , "Histórico"];
const CustomerList = ({ className, item}) => {

  //const [navigation, setnavigation]=useState(["Perfil", "Agregado", "Contribuição" , "Prestação" , "Histórico"]);
  //const [antigoNISS, setAntigoNISS] = useState(navigation[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [data1, setData1] = useState({});
  const [data, setData]=useState([])
  const [userData, setuserData] = useState({});

  const handleSubmit = (e) => {
    alert();
  };

 {/* useEffect(() => {
    read()
  },[data1]);

  function read(){

    if(data1.id>0){
      // Escalão
      data1.navigation!==null ? setAntigoNISS('Contribuição') : setAntigoNISS('Perfil')
     
    }
  }*/}

  return (
    <>
      <Card
        className={styles.card}
        
        title="Pensionista"
        classTitle={cn("title-purple", styles.title)}
        classCardHead={cn(styles.head, { [styles.hidden]: visible })}
        >
        
          <>
          
          <p>Ao Beneficiário:</p>
          <hr ></hr>
            <p>Residencia: </p>          
            
                 
        <br></br><br></br>
      <h3>Menu</h3>
        
            <div className={styles.nav}>
              {navigation.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
           
          </>
          
      
      <br></br><br></br>
        <div className={cn(styles.row, { [styles.flex]: visible })}>
          { navigation[activeIndex]==="Contribuição"&&
          (<Table
            className={styles.table}
            activeTable={visible}
            setActiveTable={setVisible}
          />)}

        { navigation[activeIndex]==="Perfil"&&
          (
        <DadosPessoais className={styles.card} data1={data1} setData1={setData1} />
        
        )}
         { navigation[activeIndex]==="Agregado"&&
          (
        <DadosPessoais className={styles.card} data1={data1} setData1={setData1} />
        
        )}

          <Details
            className={styles.details}
            onClose={() => setVisible(false)}
          />
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default CustomerList;

import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Shop.module.sass";
import Card from "../../components/Card";
import ConfirmDialog from "../../components/ConfirmDialog";
import Modal from "../../components/Modal";
import Follower from "./Follower";
import axios from "axios";

// data
import { followers } from "../../mocks/followers";

const navigation = ["Todos profissionais"];
const intervals = ["Most recent", "Most new", "Most popular"];


const Shop = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [sorting, setSorting] = useState(intervals[0]);
  const [userData, setuserData] = useState({});
  const [profissional, setProfissional] = useState([]);
  const [visibleDelModal, setVisibleDelModal] = useState(false);
  const [delmessage, setDelmessage] = useState("Tem certeza que deseja marcar essa consulta?");
  const [delresponse, setDelresponse] = useState();
  const [idAgenda, setIdAgenda] = useState(0);
  const [idProfissional, setIdProfissinal] = useState(0);
  
  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    getAllProfissional();
},[]);

  function getAllProfissional(){
    const result= axios
      .get("/candidate/getAllProfissional",{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        console.log(response);
        setProfissional(response.data.data.Profissional);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
  };
  function marcar_consulta(){
    setLoader(true)
    var data={
      "id_schedule": idAgenda,
     "id_profissional":  idProfissional
    }
    
    const result= axios
      .post("/candidate/consultSchedule", data , {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        setLoader(false)
        setVisibleDelModal(false)
        getAllProfissional()
        
      })
      .catch((err) => {
        setLoader(false)
        console.log("Error", err);
        return err.response;
      });
      return result;  
  }
  
  return (
    <>
      <div className={styles.shop}>
        <div className={styles.background} style={{height: "150px"}}>
          
        </div>
        <Card className={styles.card}>
          
          <div className={styles.control}>
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
            {/*
            <div className={styles.dropdownBox}>
              <Dropdown
                className={styles.dropdown}
                classDropdownHead={styles.dropdownHead}
                value={sorting}
                setValue={setSorting}
                options={intervals}
                small
              />
            </div>
            
            <Filters
              className={styles.filters}
              title="Showing 9 of 32 products"
            >
              <Settings />
            </Filters>
            */}
          </div>
          <div className={styles.wrap}>
            {
            activeIndex === 0 && (
              <>
                <div className={styles.followers}>
                  {profissional.map((x, index) => (
                    <Follower
                      className={styles.follower}
                      item={x}
                      key={index}
                      profissional
                      setVisibleDelModal={setVisibleDelModal}
                      setIdAgenda={setIdAgenda}
                      setIdProfissinal={setIdProfissinal}
                    />
                  ))}
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn("button-stroke button-small", styles.button)}
                  >
                    Load more
                  </button>
                </div>
              </>
            )
            }
            {activeIndex === 1 && (
             <>
             <div className={styles.followers}>
               {profissional.map((x, index) => (
                 <Follower
                   className={styles.follower}
                   item={x}
                   key={index}
                   marcar_consulta={marcar_consulta}
                 />
               ))}
             </div>
             <div className={styles.foot}>
               <button
                 className={cn("button-stroke button-small", styles.button)}
               >
                 Load more
               </button>
             </div>
           </>
            )}
            {activeIndex === 2 && (
              <>
                <div className={styles.followers}>
                  {profissional.map((x, index) => (
                    <Follower
                      className={styles.follower}
                      item={x}
                      key={index}
                      marcar_consulta={marcar_consulta}
                      setIdAgenda={setIdAgenda}
                      setIdProfissinal={setIdProfissinal}
                    />
                  ))}
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn("button-stroke button-small", styles.button)}
                  >
                    Load more
                  </button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
      <Modal 
        outerClassName={styles.outer}
        visible={visibleDelModal}
        onClose={() => setVisibleDelModal(false)}
        >
        <ConfirmDialog 
          delmessage={delmessage}
          delresponse={delresponse}
          setVisibleDelModal={setVisibleDelModal}
          action={()=>marcar_consulta()}
          loader={loader}
          
        />
      </Modal>
    </>
  );
};

export default Shop;

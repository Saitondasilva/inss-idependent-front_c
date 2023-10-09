import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Drafts.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import Table from "../../components/TableCarteiraCliente";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Panel from "./Panel";
import axios from "axios";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
// data
import { products } from "../../mocks/products";

const sorting = ["list", "grid"];
const colluns =["Nome","Data nasc.","NIF","Email","Profissão","Tel"];

const Drafts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [userData, setuserData] = useState({});
  const [produto1, setProduto1] = useState([]);
  const [data1, setData1] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);
  const [statemessage, setStatemessage] = useState("Desejas Validar o cadastro deste Utente?");
  const [stateresponse, setStateresponse] = useState();
  const [idConsultaToNestStep, setIdConsultaToNestStep] = useState(0);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    alert();
  };
  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    GetAllCliente(JSON.parse(user));
    shearchCliente(JSON.parse(user));
},[]);

useEffect(() => {
  var user = localStorage.getItem("userData");
  user==null?setuserData([]):setuserData(JSON.parse(user));
  shearchCliente(JSON.parse(user));
},[search]);

function GetAllCliente() {
    return axios
      .get("/utente/getAllUtente")
      .then((response) => {
       console.log(response.data.data)
       setProduto1(response.data.data.Utente);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};

function shearchCliente(user) {
  
  var data = {
    nome : search
  }
  return axios
    .get("/utente/getUtenteByNIF/12213123", data ,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
     console.log(response.data.data)
     setProduto1(response.data.data.Utente);
    })
    .catch((err) => {
      console.log("Error", err);
      console.log("data", data);
      return err.response;
    });
};
function NextStepConsulta(id_consulta) {
  
  return axios
    .post("/tramitationConsult/"+id_consulta)
    .then((response) => {
      GetAllCliente(userData)
      setVisibleModal(false)
     console.log(response.data.data)
    // setProduto1(response.data.data.tramitation);
    
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
};
  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Utentes"
        classTitle={cn("title-purple", styles.title)}
        head={
          <>
            <Form
              className={styles.form}
              value={search}
              setValue={setSearch}
              onSubmit={() => handleSubmit()}
              placeholder="Pesquisar por BI/NIF/Nome "
              type="text"
              name="search"
              icon="search"
              onChange={shearchCliente}
            />
            <div className={styles.sorting}>
              {sorting.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  <Icon name={x} size="24" />
                </button>
              ))}
            </div>
          </>
        }
      >
        <div className={styles.wrapper}>
          {activeIndex === 0 && (
            <Table items={produto1} colluns={colluns} title="Last edited" setIdConsultaToNestStep={setIdConsultaToNestStep} setVisibleModal={setVisibleModal}/>
            )}
          {activeIndex === 2 && (
            <>
              <div className={styles.list}>
                {produto1.map((x, index) => (
                  <Product
                    className={styles.product}
                    value={selectedFilters.includes(x.id)}
                    onChange={() => handleChange(x.id)}
                    item={x}
                    key={index}
                    released
                  />
                ))}
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button-stroke button-small", styles.button)}
                >
                  <Loader className={styles.loader} />
                  <span>Load more</span>
                </button>
              </div>
            </>
          )}
        </div>
      </Card>

      <Panel />
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
      <ConfirmDialog 
          delmessage={statemessage}
          delresponse={stateresponse}
          setVisibleDelModal={setVisibleModal}
          action={()=>NextStepConsulta(idConsultaToNestStep)}
          loader={loader}
        />
      </Modal>
    </>
  );
};

export default Drafts;

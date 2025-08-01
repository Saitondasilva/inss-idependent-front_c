import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Drafts.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import TableGestaoContribuicao from "../../components/TableJornadaCliente";
import Modal from "../../components/Modal";
import Anotacao from "./Anotacao";

import Product from "../../components/Product";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loader from "../../components/Loader";
import Panel from "./Panel";
import axios from "axios";
import { useParams } from "react-router-dom";

// data
import { products } from "../../mocks/products";


const sorting = ["list", "grid"];
const colluns =["Especialista","Valor", "Data reg."];


const MinhasConsultas = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [produto1, setProduto1] = useState([]);
  const [produto2, setProduto2] = useState([]);
  const [userData, setuserData] = useState({});
  const {id_consulta}=useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleDelModal, setVisibleDelModal] = useState(false);
  const [data1, setData1] = useState({});
  const [smsSucess, setSmsSucess] = useState("");
  const [smsError, setSmsError] = useState("");
  const [loader, setLoader] = useState(false);
  const [ActualSessao, setActualSessao] = useState({});
  const [delmessage, setDelmessage] = useState("Tem certeza que deseja apagar essa informação?");
  const [delresponse, setDelresponse] = useState();
  const [idToDel, setIdToDel] = useState(0);
 

  const handleSubmit = (e) => {
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };
  useEffect(() => {
    setSmsSucess("");
    setSmsError("");
  },[visibleModal]);
useEffect(() => {
  setSearch("")
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    getSessao(JSON.parse(user));
},[id_consulta]);
useEffect(() => {
  var user = localStorage.getItem("userData");
  user==null?setuserData([]):setuserData(JSON.parse(user));
  searchConsultaCliente(JSON.parse(user));
},[search]);

function getNextSessao(){
  var i=0;
  produto1.forEach((element) => {
    if(element.item.length===0 && i===0) {
      console.log("Sessao ", element)
      setActualSessao(element)
      i++
    }
  });
}
function getSessao(user) {
  
    return axios
      .get("/getSessaoConsulta/"+id_consulta ,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
       console.log(response.data.data)
       setProduto1(response.data.data.sessions);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};
function SaveAnotacaoSessao(sessao) {
  console.log("Sessao",sessao.id)
  var data={
    nota:data1.nota,

    id_sessao:sessao.id,
    id_consulta:id_consulta
  }
  setLoader(true)
  return axios
    .post("/candidate/SaveAnotacaoSessao" ,data,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      getSessao(userData);
     setSmsSucess("Registo com exito");
     setSmsError("");
     setLoader(false)
      data1.nota="";
    })
    .catch((err) => {
      setSmsSucess("");
      setSmsError(err.response.data.message);
      console.log("Error", err);
      setLoader(false)
      return err.response;
    });
}
function searchConsultaCliente(user) {

  var data = {
    nome_profissional :  ""+search
  }
  return axios
    .post("/candidate/searchConsultaCliente/"+user.id, data ,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
     console.log(response.data.data)
     setProduto2(response.data.data.Consulta);
    })
    .catch((err) => {
      console.log("Error", err);
      console.log("data", data);
      return err.response;
    });
};

function delAnotacao(id){
  setLoader(true)
  return axios
    .post("/candidate/delConsultaAnotation/"+id)
    .then((response) => {
      
      getSessao(userData);     
      
    }).then((response)=>{
      setLoader(false)
    }).then((response)=>{
      setVisibleDelModal(false)
    })
    .catch((err) => {
      console.log("Error", err);
      setDelresponse(err.data.message)
      return err.response;
    });
 
}
  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Jornada"
        classTitle={cn("title-purple", styles.title)}
        head={
          <>
            <Form
              className={styles.form}
              value={search}
              setValue={setSearch}
              onSubmit={() => handleSubmit()}
              placeholder="Procurar Cliente"
              type="text"
              name="search"
              icon="search"
              onChange={searchConsultaCliente}
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
          {(activeIndex === 0) && <TableGestaoContribuicao items={produto2} colluns={colluns} setActiveIndex={setActiveIndex} title="Last edited" />}
          {activeIndex === 1 && (
            <>
              <div className={styles.list}>
                {produto1.map((x, index) => ( 
                  x.item.length>0 ? (
                    <>
                        <Product
                        className={styles.product}
                        value={selectedFilters.includes(x.id)}
                        onChange={() => handleChange(x.id)}
                        item={x}
                        key={index}
                        released
                        setVisibleModal={setVisibleModal}
                        setVisibleDelModal={setVisibleDelModal}
                        setActualSessao={setActualSessao}
                        setIdToDel={setIdToDel}
                      />
                    </>  
                  ) : 
                  (<></>)
                  
                ))}
              </div>
              
            </>
          )}
          <br></br>
          
         
        </div>
      </Card>
      <Panel />

      <Modal 
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        style={{width: "900px"}}
        >
        <Anotacao 
          data1={data1}
          setData1={setData1}
          SaveAnotacaoSessao={SaveAnotacaoSessao}
          ActualSessao={ActualSessao}
          smsError={smsError}
          smsSucess={smsSucess}
          loader={loader}
          proximaSessao={ActualSessao}
        />
      </Modal>
      <Modal 
        outerClassName={styles.outer}
        visible={visibleDelModal}
        onClose={() => setVisibleDelModal(false)}
        style={{width: "408px"}}
        >
        <ConfirmDialog 
          delmessage={delmessage}
          delresponse={delresponse}
          setVisibleDelModal={setVisibleDelModal}
          action={()=>delAnotacao(idToDel)}
          loader={loader}
        />
      </Modal>

    </>
  );
};

export default MinhasConsultas;

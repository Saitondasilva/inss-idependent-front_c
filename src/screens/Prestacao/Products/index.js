import React, { useState, useEffect } from "react";
import styles from "./Products.module.sass";
import styles1 from "./Market.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Market from "./Market";
import axios from "axios";

// data

import TextInput from "../../../components/TextInput";
import Icon from "../../../components/Icon";

const Products = ({ className, data1, setData1 }) => {
  const [navigation, setNavigation] = useState(["Todos"]);
  const [activeTabID, setActiveTabID] = useState([]);
  const [content, setContent] = useState();
  const [activeTab, setActiveTab] = useState(navigation[0]);

  const [search, setSearch] = useState([]);
  const [userData, setuserData] = useState({});
  const [produto1, setProduto1] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [resolution, setResolution] = useState(true);

 
  const [optionsPrestacao, setOptionsPrestacao] = useState(["Todas as Prestações"]);
  const [prestacao, setPrestacao] = useState(optionsPrestacao[0]);
  const [prestacaoID, setPrestacaoID] = useState([]);
  
  data1.descricao=content;

  function read(){
    if(data1.id_prestacao>0){
      //Prestacao
      var position2        =   prestacaoID.indexOf(data1.id_prestacao)
      setPrestacao(optionsPrestacao[position2])
    }
  }
   
    useEffect(() => {
      var position        =   optionsPrestacao.indexOf(prestacao);
          data1.id_prestacao   =   prestacaoID[position];
    }, [prestacao]);
    useEffect(() => {
      read()
    }, [data1]);  
  
    function getPrestacao(){
      return axios
      .get("/getPrestacao")
      .then((response) => {
        var a =new Array();
        var b =new Array();
        for(var i=0; i<response.data.data.length; i++){
          a.push(response.data.data[i].descricao)
          b.push(response.data.data[i].id)
        }
        setOptionsPrestacao(a);
        setPrestacaoID(b);
        setPrestacao([optionsPrestacao[0]])
        setNavigation(a);
        setActiveTabID(b);
        
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
    }

  function onChangeSearch(e) {
    console.log(e)
    setSearch((search) => ({
      ...search,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
   getPrestacao();
   
    GetAllPedidoPrestacao(currentPage).then((paginationInfo) => {
      setTotalPages(Math.ceil(paginationInfo.total / paginationInfo.per_page));
    });
  
},[]);

function GetAllPedidoPrestacao(page=1) {
  var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
  const page_size = 10; // Número de itens por página
  console.log(" userData", userData)  
    return axios
      .get(`/utente/getallpedidoprestacao?page=${page}&page_size=${page_size}`, {
        headers: { Authorization: `Bearer ${JSON.parse(user).token}` },
      })
      .then((response) => {
        const { pedido_prestacao, total, per_page, current_page } = response.data.data;   
        console.log(" pedido prestacao", pedido_prestacao)   
        setProduto1(pedido_prestacao);
        return { total, per_page, current_page };
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
    GetAllPedidoPrestacao(newPage).then(() => {
      setCurrentPage(newPage);
    });
  }
};
/*
function GetPesquisa() {
  return axios
    .get("/utente/getallpedidoprestacaoByIdPrestacao/"+data1.id_prestacao)
    .then((response) => {
      const { pedido_prestacao, total, per_page, current_page } = response.data.data;      
        setProduto1(pedido_prestacao);
        return { total, per_page, current_page };   
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
};*/
function getEstadoUtente(){
  return axios
  .get("/getEstadoUtente")
  .then((response) => {
    var a =new Array();
    var b =new Array();   
    for(var i=0; i<response.data.data.length; i++){
      a.push(response.data.data[i].descricao)
      b.push(response.data.data[i].id)
    }    
    setNavigation(a);
    setActiveTabID(b);
    })
  .catch((err) => {
    console.log("Error", err);
    return err.response;
  });
}
//pega os dados de navegação e muda as setvalues e das tabelas 
function changeTab(x){
  setPrestacao(x)
  GetAllPedidoPrestacao(1)
  setCurrentPage(1)
}


  return (
    <Card
      className={styles.card}
      title="Beneficiário"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
      head={
        <>
         <TextInput
          className={styles.field}
          name="nome"
          type="text"
          icon="search"
          required
          onChange={onChangeSearch}
          value={search.nome}
          
        />

        Tipo Prestação:
         <Dropdown
              className={styles.field}             
              setValue={changeTab}
              options={optionsPrestacao}
              onChange={data1.sexo=prestacao}
              value={prestacao}
              onClick={() => changeTab()}
             
              style={{padding: "0 48px 0 150px !important"}}
            /> 
        </>
        
      }
      
    >

            <hr></hr>
    
      <div className={styles.products}>
        <div className={styles.wrapper}>
        
          {<Market items={produto1} id_prestacao={data1.id_prestacao} />}
         
          <div className={styles1.foot}>
            <button className={styles1.arrow} onClick={() => handlePageChange(currentPage - 1)}>
              <Icon name="arrow-left" size="20" />
            </button>
            {currentPage} / {totalPages}
            <button className={styles1.arrow} onClick={() => handlePageChange(currentPage + 1)}>
              <Icon name="arrow-right" size="20"  />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Products;

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

const Products = () => {
  const [navigation, setNavigation] = useState(["Todos"]);

  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [activeTabID, setActiveTabID] = useState([]);
  const [search, setSearch] = useState([]);
  const [userData, setuserData] = useState({});
  const [produto1, setProduto1] = useState([]);
  const [id, setId] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const handleSubmit = (e) => {
    GetPesquisa()
  };

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
    getEstadoUtente();
    
     GetAllUtente(currentPage).then((paginationInfo) => {
      setTotalPages(Math.ceil(paginationInfo.total / paginationInfo.per_page));
    });
    
},[]);

function GetAllUtente(page=1) {
  const page_size = 10; // Número de itens por página
    return axios
      .get(`/utente/getAllUtente?page=${page}&page_size=${page_size}`)
      .then((response) => {
        const { Utente, total, per_page, current_page } = response.data.data;      
        setProduto1(Utente);
        return { total, per_page, current_page };
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
    GetAllUtente(newPage).then(() => {
      setCurrentPage(newPage);
    });
  }
};
function GetPesquisa() {
  return axios
    .get("/utente/getUtenteByNIF/"+search.nome)
    .then((response) => {
     console.log(response.data.data)
     setProduto1(response.data.data.Utente);    
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
};
function getEstadoUtente(){
  return axios
  .get("/getEstadoUtente")
  .then((response) => {
    var a =new Array();
    var b =new Array();
    a.push("Todos")
    b.push(0);
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
function changeTab(x){
  setActiveTab(x)
  var position          =   navigation.indexOf(x);
 var id=activeTabID[position];
 setId(id);
  GetAllUtente(1)
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
          onKeyUp={GetPesquisa}
          onChange={onChangeSearch}
          value={search.nome}
        />
          <div className={styles.control}>
            <button className={cn("button-stroke button-small", styles.button)}>
              Deleted
            </button>
            <button className={cn("button-stroke button-small", styles.button)}>
              Set status
            </button>
            <div className={styles.counter}>3 selected</div>
          </div>
          <div className={cn(styles.nav, "tablet-hide")}>
            {navigation.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: x === activeTab,
                })}
                onClick={() => changeTab(x)}
                key={index}
              >
                {x}
              </button>
            ))}
          </div>
          <div className={cn(styles.dropdown, "tablet-show")}>
            <Dropdown
              classDropdownHead={styles.dropdownHead}
              value={activeTab}
              setValue={setActiveTab}
              options={navigation}
              small
            />  
          </div>
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
        
          {<Market items={produto1} id_estado_utente={id} />}
         
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

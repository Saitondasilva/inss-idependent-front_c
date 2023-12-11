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
  const [id, setId] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [resolution, setResolution] = useState(true);

 
  const [optionsGenero, setOptionsGenero] = useState(["Todos"]);
  const [genero, setGenero] = useState(optionsGenero[0]);
  const [generoID, setGeneroID] = useState([]);
  
  data1.descricao=content;

  const handleSubmit = (e) => {
    GetPesquisa()
  };

  function read(){
    if(data1.id>0){
      //Genero
      var position2        =   generoID.indexOf(data1.id_sexo)
      setGenero(optionsGenero[position2])
    
    }
    }
   
    useEffect(() => {
      var position        =   optionsGenero.indexOf(genero);
          data1.id_sexo   =   generoID[position];
    }, [genero]);
    useEffect(() => {
      read()
    }, [data1]);  
  
    function getGenero(){
      return axios
      .get("/getPrestacao")
      .then((response) => {        
        var a =new Array();
        var b =new Array();
        a.push("Todos")
        b.push(0);
        for(var i=0; i<response.data.data.length; i++){
          a.push(response.data.data[i].descricao)
          b.push(response.data.data[i].id)
        }
        setOptionsGenero(a);
        setGeneroID(b);
        setGenero([optionsGenero[0]])
        setNavigation(a);
        setActiveTabID(b);
        
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
    }

    useEffect(() => {
      getGenero()
     
      
    },[]);

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
   // getEstadoUtente();
   getGenero();
    
     GetAllUtente(currentPage).then((paginationInfo) => {
      setTotalPages(Math.ceil(paginationInfo.total / paginationInfo.per_page));
    });
    
},[]);
{/*get(`/utente/getallpedidoprestacao?page=${page}&page_size=${page_size}`,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })*/}

function GetAllUtente(page=1) {
  const page_size = 10; // Número de itens por página
    return axios
      .get(`/utente/getallpedidoprestacao/4`,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        const { contribuicao, total, per_page, current_page } = response.data.data;      
        setProduto1(contribuicao);
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
  setGenero(x)
  var position          =   optionsGenero.indexOf(x);
 var id=activeTabID[position];
 setId(id);
  GetAllUtente(1)
  setCurrentPage(1)
}

/*useEffect(() => {
  getGenero()
  
  
},[]);*/
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
        
        </>
        
      }
      
    >
        <span className={styles.field}>
          <Dropdown
              className={styles.field1}
              label="Tipo de Prestação"
              
              setValue={changeTab}
              options={optionsGenero}
              onChange={data1.sexo=genero}
              value={genero}
              onClick={() => changeTab()}
             
              style={{width: "250px"}}
            /> 
            </span>
            <br></br>
            <hr></hr>
    
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

import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Drafts.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import TableJornadaCliente from "../../components/TableJornadaCliente";
import Modal from "../../components/Modal";
import Anotacao from "./Anotacao";
import Vermais from "./Vermais";
import Product from "../../components/Product";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loader from "../../components/Loader";
import Panel from "./Panel";
import axios from "axios";
import { useParams } from "react-router-dom";

// data
import Dropdown from "../../components/Dropdown";


const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro",
"Outubro", "Novembro","Dezembro"];

const anos = ["2023", "2024","2025","2026","2027","2028","2029","2030"];
const intervals = ["Recentes", "Não lidas"];
const colluns =["Codigo de Transacao","Data Transaçao","Forma Transaçao", "valor"];


const Drafts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [produto1, setProduto1] = useState([]);
  const [produto2, setProduto2] = useState([]);
  const [userData, setuserData] = useState({});
  const {id_consulta}=useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleVermaisModal, setVisibleVermaisModal] = useState(false);
  const [visibleDelModal, setVisibleDelModal] = useState(false);
  const [data1, setData1] = useState({});
  const [smsSucess, setSmsSucess] = useState("");
  const [smsError, setSmsError] = useState("");
  const [loader, setLoader] = useState(false);
  const [ActualSessao, setActualSessao] = useState({});
  const [delmessage, setDelmessage] = useState("Tem certeza que deseja apagar essa informação?");
  const [delresponse, setDelresponse] = useState();
  const [idToDel, setIdToDel] = useState(0);
  const [blob, setBlob] = useState('');
  const [sorting, setSorting] = useState(intervals[0]);
  const [ano, setAno] = useState(anos[0]);
  const [mes, setMes] = useState(meses[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSubmit = (e) => {
    alert();
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
       // Chama getNotification quando o componente é montado
       getContribuicao(currentPage).then((paginationInfo) => {
        console.log("PAGINATIONINFO",paginationInfo)
        setTotalPages(Math.ceil(paginationInfo.total / paginationInfo.per_page));
      });
},[]);

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
function getContribuicao(page=1) {
  const page_size = 10; // Número de itens por página
    return axios
      .get(`/utente/getAllContribuicao?page=${page}&page_size=${page_size}` ,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
       console.log("PRODUTO1===",response.data.data.contribuicao)
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
    getContribuicao(newPage).then(() => {
      setCurrentPage(newPage);
    });
  }
};
function SaveAnotacaoSessao(sessao) {
  console.log("Sessao",sessao)
  var data={
    descricao:data1.descricao,
    id_sessao:sessao.id,
    id_consulta:id_consulta
  }
  setLoader(true)
  return axios
    .post("/candidate/SaveAnotacaoSessao" ,data,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
      //getSessao(userData);
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
function shearchCliente(user) {

  var data = {
    nome_cliente :  ""+search
  }
  return axios
    .post("/candidate/searchCarteiraCliente/"+user.id, data ,{
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    .then((response) => {
     console.log(response.data.data)
     setProduto2(response.data.data.Carteira);
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
      
     // getSessao(userData);     
      
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


function dellFile(){

}
  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Contribuições"
        classTitle={cn("title-purple", styles.title)}
        head={
          <>
            <Form
              className={styles.form}
              value={search}
              setValue={setSearch}
              onSubmit={() => handleSubmit()}
              placeholder="Pesquisar por NIF"
              type="text"
              name="search"
              icon="search"
              onChange={shearchCliente}
            />
{/*
            Mês:
            <span >
            <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={mes}
            setValue={setMes}
            options={meses}
            />
            </span>
            Ano:
            <span >
            <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={ano}
            setValue={setAno}
            options={anos}
            />
            </span>
        */}
          </>
        }
      >
        <div className={styles.wrapper}>
          <TableJornadaCliente items={produto1} colluns={colluns} setActiveIndex={setActiveIndex} title="Last edited" />
        
          <div className={styles.foot}>
            <button className={styles.arrow} onClick={() => handlePageChange(currentPage - 1)}>
              <Icon name="arrow-left" size="20" />
            </button>
            {currentPage} / {totalPages}
            <button className={styles.arrow} onClick={() => handlePageChange(currentPage + 1)}>
              <Icon name="arrow-right" size="20"  />
            </button>
         </div>


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
          smsSucess={smsSucess}
          smsError={smsError}
          setSmsSucess={setSmsSucess}
          setSmsError={setSmsError}
          proximaSessao={ActualSessao}
          dellFile={dellFile}
          id_consulta={id_consulta}
          userData={userData}
        />
      </Modal>
      <Modal 
        visible={visibleVermaisModal}
        onClose={() => setVisibleVermaisModal(false)}
        style={{width: "1200px"}}
        >
        <Vermais 
          data1={data1}
          setData1={setData1}
          SaveAnotacaoSessao={SaveAnotacaoSessao}
          ActualSessao={ActualSessao}
          smsError={smsError}
          setVisibleVermaisModal={setVisibleVermaisModal}
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

export default Drafts;

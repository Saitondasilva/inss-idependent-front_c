import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Drafts.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import TableGestaoContribuicao from "../../components/TableJornadaCliente";
import Modal from "../../components/Modal";
import Anotacao from "./Anotacao";
import Vermais from "./Vermais";
import Product from "../../components/Product";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loader from "../../components/Loader";
import Panel from "./Panel";
import axios from "axios";
import { useParams } from "react-router-dom";
import Item from "./Item";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

// data
import Dropdown from "../../components/Dropdown";


const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro",
"Outubro", "Novembro","Dezembro"];

const anos = ["2023", "2024","2025","2026","2027","2028","2029","2030"];
const intervals = ["Recentes", "Não lidas"];
const colluns =["Codigo de Transacao","Data Transaçao","NIF","NIS","Forma Transaçao", "valor"];


const Drafts = ({tipoContribuicao}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [dataI, setDataI] = useState(new Date().getFullYear()+'-'+(new Date().getMonth())+'-'+new Date().getDate());
  const [dataF, setDataF] = useState(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate());
  const [produto1, setProduto1] = useState([]);
  const [userData, setuserData] = useState({});
  const [visibleDelModal, setVisibleDelModal] = useState(false);
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
  const [startDate, setStartDate] = useState(new Date());


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
          setTotalPages(Math.ceil(paginationInfo.total / paginationInfo.per_page));
        });     
},[]);
useEffect(() => {
  // Chama shearchContribute quando o componente é montado
    shearchContribute(currentPage).then((paginationInfo) => {
      setTotalPages(Math.ceil(paginationInfo.total / paginationInfo.per_page));
    });

},[search,dataI, dataF]);

function getContribuicao(page=1) {
  setLoader(true)
  const page_size = 10; // Número de itens por página
    return axios
      .get(`/utente/getAllContribuicao?page=${page}&page_size=${page_size}` ,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
       const { contribuicao, total, per_page, current_page } = response.data.data;
       setProduto1(contribuicao);
       setLoader(false)
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

function shearchContribute(page=1){
  setLoader(true)
  const page_size = 10; // Número de itens por página

  var data = {
    numero :  search,
    dataI: dataI,
    dataF: dataF
  }
    return axios
      .post(`/utente/searchContribuicao?page=${page}&page_size=${page_size}`, data, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
       const { contribuicao, total, per_page, current_page  } = response.data.data;
       setProduto1(contribuicao);
       console.log("dataI", data.dataI);
       console.log("CONTRIBUICAO", contribuicao);
       setLoader(false)
       return { total, per_page, current_page };
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};

function searchMounthContribuicao(page=1){
  setLoader(true)
  const page_size = 10; // Número de itens por página
  var data = {
    numero :  search,
    dataI: ""+dataI,
    dataF:""+dataF
  }

    return axios
      .post(`/utente/searchMounthContribuicao?page=${page}&page_size=${page_size}`, data, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
       const { contribuicao, total, per_page, current_page } = response.data.data;
       setProduto1(contribuicao);
       console.log("ENVIADO ", search)
       console.log("CONTRIBUICAO", contribuicao);
       setLoader(false)
       return { total, per_page, current_page };
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};


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
              placeholder="Pesquisar por NIF ou NIS"
              type="text"
              name="search"
              icon="search"
            />
            
            De: <Form
              className={styles.form}
              value={dataI}
              setValue={setDataI}
              type="date"
              name="dataI"
              icon="date"
              style={{color:"green"}}
            />
         
          Até: <Form
              className={styles.form}
              value={dataF}
              setValue={setDataF}
              type="date"
              name="dataF"
              icon="date"
              style={{with:"5px"}}
            />
        
           
          </>
        }
      >
        <div className={styles.wrapper}>
          <TableGestaoContribuicao items={produto1} colluns={colluns} setActiveIndex={setActiveIndex} title="Last edited" loader={loader} />
        
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
        outerClassName={styles.outer}
        visible={visibleDelModal}
        onClose={() => setVisibleDelModal(false)}
        style={{width: "408px"}}
        >
        <ConfirmDialog 
          delmessage={delmessage}
          delresponse={delresponse}
          setVisibleDelModal={setVisibleDelModal}
          action={()=>alert(idToDel)}
          loader={loader}
        />
      </Modal>

    </>
  );
};

export default Drafts;

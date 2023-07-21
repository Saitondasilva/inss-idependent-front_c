import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Search.module.sass";
import Icon from "../../../components/Icon";
import Item from "./Item";
import page from "../../../components/Page"
import Suggestion from "./Suggestion";
import ModalProduct from "../../../components/ModalProduct";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Loader from "../../../components/Loader";

const result = [
  {
    title: "Put your title here",
    content: "Small caption",
    image: "/images/content/product-pic-3.jpg",
    image2x: "/images/content/product-pic-3@2x.jpg",
  },
  {
    title: "Put your title here",
    content: "Small caption",
    image: "/images/content/product-pic-4.jpg",
    image2x: "/images/content/product-pic-4@2x.jpg",
  },
];


const Search = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [produto1, setProduto1] = useState([]);
  const [data1, setData1] = useState({});
  const [userData, setuserData] = useState({});
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
    
  }
  useEffect(() => {
    setSearch("")
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
  },[]);

  function shearchCliente(e) {
    setVisible(false);
    var data = {
      nome_cliente :  ""+e.target.value
    }
    console.log("serch "+data.nome_cliente)
    return axios
      .post("/candidate/searchCarteiraCliente/"+userData.id, data ,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        setProduto1(response.data.data.Carteira);
        setVisible(true);
       console.log(response.data.data)
       
      })
      .catch((err) => {
        console.log("Error", err);
        console.log("data", data);
        return err.response;
      });
  };
function updateSelectedClient(cliente){
  setLoader(true)
  cliente.length=1;
  localStorage.setItem('SelectedClient',JSON.stringify(cliente))
  console.log("Client", cliente)
  //window.dispatchEvent(new Event('storage'))
  //navigate("/analise/progresso/"+cliente,{replace: true})
   window.location.reload(true);
}
  return (
    <>
      <div
        className={cn(styles.search, className, { [styles.active]: visible })}
      >
        <div className={styles.head}>
        {loader? (<Loader className={styles.loader} />):
        (
          <>
            <button className={styles.start}>
              <Icon name="search" size="24" />
            </button>
            <button className={styles.direction}>
            <Icon name="arrow-left" size="24" />
            </button>
          </>
        )
        } 
          
          
          <input
            className={styles.input}
            type="text"
            placeholder="Pesquisar cliente"
            id="search"
            name="search"
            value={data1.search}
            onChange={(e)=>{shearchCliente(e)}}
          />
          <button className={styles.result}>⌘ F</button>
          <button className={styles.close} onClick={() => setVisible(false)}>
            <Icon name="close-circle" size="24" />
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.box}>
            <div className={styles.category}>Resultado da pesquisa</div>
            <div className={styles.list}>
              {produto1.map((x, index) => (
                <Item
                  className={styles.item}
                  item={x}
                  key={index}
                  onClick={() => updateSelectedClient(x)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default Search;

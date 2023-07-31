import React, { useState,useEffect } from "react";
import cn from "classnames";
import styles from "./PopularProducts.module.sass";
import { Link } from "react-router-dom";
import Card from "../Card";
import ModalProduct from "../ModalProduct";
import axios from "axios";

const now = new Date();


const PopularProducts = ({ className, views, getNameMounth, userData }) => {
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);
  const [hora, setHora] = useState("--:--");
  const [profissional, setProfissional] = useState("");
  const [profission, setProfission] = useState("");
  const [dia, setDia] = useState("");
  const [valor, setValor] = useState("");
  const [produto1, setProduto1] = useState([]);

  useEffect(() => {
    
    GetAllConsult(userData);
},[]);
  const products = [
    {
      title: profissional,
      price: valor,
      active: true,
      image: "/images/content/product-pic-1.jpg",
      image2x: "/images/content/product-pic-1@2x.jpg",
    },
    {
      title: "Bento Matte 3D illustration 1.0",
      price: "$105.60",
      active: false,
      image: "/images/content/product-pic-2.jpg",
      image2x: "/images/content/product-pic-2@2x.jpg",
    },
    {
      title: "Fleet - travel shopping kit",
      price: "$648.60",
      active: true,
      image: "/images/content/product-pic-3.jpg",
      image2x: "/images/content/product-pic-3@2x.jpg",
    },
    {
      title: "Fleet - travel shopping kit",
      price: "$648.60",
      active: true,
      image: "/images/content/product-pic-4.jpg",
      image2x: "/images/content/product-pic-4@2x.jpg",
    },
    {
      title: "Crypter - NFT UI kit",
      price: "$2,453.80",
      active: true,
      image: "/images/content/product-pic-5.jpg",
      image2x: "/images/content/product-pic-5@2x.jpg",
    },
    {
      title: "Bento Matte 3D illustration 1.0",
      price: "$105.60",
      active: false,
      image: "/images/content/product-pic-2.jpg",
      image2x: "/images/content/product-pic-2@2x.jpg",
    },
    {
      title: "Fleet - travel shopping kit",
      price: "$648.60",
      active: true,
      image: "/images/content/product-pic-3.jpg",
      image2x: "/images/content/product-pic-3@2x.jpg",
    },
    {
      title: "Fleet - travel shopping kit",
      price: "$648.60",
      active: true,
      image: "/images/content/product-pic-4.jpg",
      image2x: "/images/content/product-pic-4@2x.jpg",
    },
  ];

  function GetAllConsult(user) {
    return axios
      .get("/candidate/allConsultUser/"+user.id)
      .then((response) => {
      console.log(response.data.data)
       setProduto1(response.data.data.Schedule);
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  };

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Ultimas Contribuições Aprovadas"
        classTitle="title-blue"
      >
        <div className={styles.popular}>
          <div className={styles.head}>
            <div className={styles.stage}>{getNameMounth(now.getMonth()+1)+'/'+now.getFullYear()}</div>
            {/*<div className={styles.stage}>Earning</div>*/}
          </div>
          <div className={styles.list}>
            {produto1.map(
              (x, index) =>
                views > index && (
                  <div
                    className={styles.item}
                    key={index}
                    /*onClick={() => setVisibleModalProduct(true)}*/
                  >
                    <div className={styles.preview} style={{backgroundColor: "#aee4", textAlign:"center", padding:"5px", fontSize:"32px"}}>
                      {new Date(x.day).getDate()}
                      {/*<img
                        srcSet={`${x.deleted_at} 2x`}
                        src={x.deleted_at}
                        alt="Product"
                      />*/}
                    </div>
                    <div className={styles.title}>{x.begin_hour+ " - "+x.first_name+" "+x.last_name}
                    <br></br>
                    <small>{x.description}</small>
                    </div>
                    {/*
                    <div className={styles.deleted_at}>
                      <div className={ styles.status}>{"R$"+x.value}</div>
                      {x.id_step ? (
                        <div className={cn("status-green", styles.status)}>
                          Ativo
                        </div>
                      ) : (
                        <div className={cn("status-red", styles.status)}>
                          Desativo
                        </div>
                      )}
                    </div>
                    */}
                  </div>
                )
            )}
          </div>
          <Link
            className={cn("button-stroke", styles.button)}
            to="/agenda/profissional"
          >
            Todas Contribuições
          </Link>
        </div>
      </Card>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default PopularProducts;

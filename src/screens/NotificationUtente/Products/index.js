import React, { useState, useEffect } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Market from "./Market";
import Table from "./Table";
import axios from "axios";

// data
import { traffic } from "../../../mocks/traffic";
import { viewers } from "../../../mocks/viewers";
import { market } from "../../../mocks/market";

const indicatorsTraffic = [
  {
    title: "Market",
    color: "#FFBC99",
  },
  {
    title: "Social media",
    color: "#CABDFF",
  },
  {
    title: "Direct",
    color: "#B5E4CA",
  },
  {
    title: "UI8",
    color: "#B1E5FC",
  },
  {
    title: "Others",
    color: "#FFD88D",
  },
];

const indicatorsViewers = [
  {
    title: "Followers",
    color: "#B5E4CA",
  },
  {
    title: "Others",
    color: "#CABDFF",
  },
];

const Products = () => {
  const navigation = ["Market"];

  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [search, setSearch] = useState("");
  const [userData, setuserData] = useState({});
  const [market, setProduto1] = useState([]);

  const handleSubmit = (e) => {
    alert();
  };

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    GetAllCliente(JSON.parse(user));
   
},[]);



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

  return (
    <Card
      className={styles.card}
      title="Beneficiário"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={() => handleSubmit()}
            placeholder="Pesquisa Beneficiário"
            type="text"
            name="search"
            icon="search"
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
                onClick={() => setActiveTab(x)}
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
          {activeTab === navigation[0] && <Market items={market} />}
          {/*activeTab === navigation[1] && (
            <Table
              title="Traffic source"
              items={traffic}
              legend={indicatorsTraffic}
            />
          )*/}
          {/*activeTab === navigation[2] && (
            <Table title="Viewers" items={viewers} legend={indicatorsViewers} />
          )*/}
        </div>
      </div>
    </Card>
  );
};

export default Products;

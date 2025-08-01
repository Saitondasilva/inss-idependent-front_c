import React, { useState } from "react";
import cn from "classnames";
import styles from "./Scheduled.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import Table from "../../components/Table";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Panel from "./Panel";

// data
import { products } from "../../mocks/products";
const colluns =["Foto","Nome","Email", "Data reg."];
const Scheduled = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Products"
        classTitle={cn("title-purple", styles.title)}
        head={
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={() => handleSubmit()}
            placeholder="Search product"
            type="text"
            name="search"
            icon="search"
          />
        }
      >
        <div className={styles.wrapper}>
          <Table items={products} colluns={colluns} title="Scheduled for" />
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default Scheduled;

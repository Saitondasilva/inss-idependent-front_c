import React, {useState} from "react";
import styles from "./Customers.module.sass";
import Form from "../../components/Form";
import FormAnalise from "./FormAnalise";
import TrafficChannel from "./TrafficChannel";
import ProgressoHistory from "./ProgressoHistory";
import Data from "../../components/Data";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import axios from "axios";


const sorting = ["list", "grid"];

const Customers = () => {
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [error, setErrror] = useState();
  const [data1, setData1] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(0);

  const handleClick = () => {
    setStartDate(null);
    setTimeout(() => setStartDate(new Date()), 10);
    setVisibleDate(false);
  };
  const handleSubmit = (e) => {
    alert();
  };

 
function onChangeData(e) {
  setData1((data1) => ({
    ...data1,
    [e.target.name]: e.target.value,
  }));
}
  return (
   <>
   

<div className={styles.wrapper}>
<FormAnalise className={styles.card} update={update} setUpdate={setUpdate} />
  <TrafficChannel className={styles.card} update={update} setUpdate={setUpdate} />
  <ProgressoHistory className={styles.card} />
</div>
   </>
     );
};

export default Customers;

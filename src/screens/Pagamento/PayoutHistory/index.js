import React, {useState,useEffect,useCallback} from "react";
import cn from "classnames";
import styles from "./PayoutHistory.module.sass";
import Card from "../../../components/Card";
import { numberWithCommas } from "../../../utils.js";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";


//now.setDate();
var sevenDay=subDate(7);
var fiftDay=subDate(15);
var oneMounth=subDate(30);
var treeMounth=subDate(90);
var sixMounth=subDate(180);
const intervals = ["Ultimos 7 dias", "Ultimos 15 dias", "Deste mês", "Ulmimos 3 mêses", "Ulmimos 6 mêses"];
const intervalsDate = [sevenDay, fiftDay, oneMounth, treeMounth, sixMounth];
function subDate(day){
  var now = new Date();
  return new Date(now.setDate(now.getDate()-day))
}
const PayoutHistory = ({ className,id_type_user }) => {
  const [items, setItems] = useState([]);
  const [sorting, setSorting] = useState(intervals[0]);
  var sorting1=null;
  
  const getPayment_Ansc=(date) =>{
    var data = {
      date_begin: date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
    };
     return axios 
      .post("/candidate/getAllPayment/"+id_type_user, data,{})
      .then((response) => {
       var result = response.data.data.payment;
       console.log("Rseponse",result);
       //if(result.length>0)
       setItems(result);
       //console.log("Items",items);
       return result;
      })
      .catch((err) => {
        console.log("Error", err);
        return ["Error", err.response];
      });
};

useEffect(() => {
  var position    =   intervals.indexOf(sorting);
  sorting1        =   intervalsDate[position];
  getPayment_Ansc(sorting1);
  
}, [sorting,id_type_user]);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Lista de Pagamentos"
      classTitle="title-blue"
      head={
        <>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sorting}
            setValue={setSorting}
            options={intervals}
            small
          />
          
        </>
}
    >
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>Nome</div>
            <div className={styles.col}>Data</div>
            <div className={styles.col}>Valor</div>
            <div className={styles.col}>Tipo</div>         
          </div>
          {items.map((x, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.col}>{x.id_user}</div>
              <div className={styles.col}>{x.date_reg}</div>
              <div className={styles.col}>{x.value}</div>
              <div className={styles.col}>{x.id_state}</div>
              
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PayoutHistory;

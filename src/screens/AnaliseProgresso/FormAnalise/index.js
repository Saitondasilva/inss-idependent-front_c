import React, { useState,useEffect } from "react";
import styles from "./progresso.module.sass";
import cn from "classnames";
import Form from "../../../components/Form";
import Card from "../../../components/Card";
import Item from "../../../components/Schedule/Item";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import TextInput from "../../../components/TextInput";
import Search from "../Search";
import Switch from "../../../components/Switch";
import Icon from "../../../components/Icon";
import axios from "axios";

import useDarkMode from "use-dark-mode";
/*
setCreators([{
  id: 0,
  creator: "Reed Parker",
  avatar: "/images/content/avatar-1.jpg",
  colorNumber: "#B5E4CA",
  productsCounter: 16,
  followers: 3568,
  products: [
    {
      image: "/images/content/product-pic-1.jpg",
      image2x: "/images/content/product-pic-1@2x.jpg",
    },
    {
      image: "/images/content/product-pic-2.jpg",
      image2x: "/images/content/product-pic-2@2x.jpg",
    },
    {
      image: "/images/content/product-pic-3.jpg",
      image2x: "/images/content/product-pic-3@2x.jpg",
    },
    {
      image: "/images/content/product-pic-5.jpg",
      image2x: "/images/content/product-pic-5@2x.jpg",
    },
    {
      image: "/images/content/product-pic-4.jpg",
      image2x: "/images/content/product-pic-4@2x.jpg",
    },
    {
      image: "/images/content/product-pic-1.jpg",
      image2x: "/images/content/product-pic-1@2x.jpg",
    },
    {
      image: "/images/content/product-pic-2.jpg",
      image2x: "/images/content/product-pic-2@2x.jpg",
    },
    {
      image: "/images/content/product-pic-3.jpg",
      image2x: "/images/content/product-pic-3@2x.jpg",
    },
    {
      image: "/images/content/product-pic-4.jpg",
      image2x: "/images/content/product-pic-4@2x.jpg",
    },
  ],
}]);*/
const intervals = ["Last 7 days", "This month", "All time"];

const FormAnalise = ({ className,update,setUpdate }) => {
  const [visibleDate, setVisibleDate] = useState(false);

  const darkMode = useDarkMode(false);
  const [sorting, setSorting] = useState(intervals[0]);
  const [search, setSearch] = useState("");
  const [data1, setData1] = useState([]);
  const [userData, setuserData] = useState({});
  const [smsError, setSmsError] = useState("");
  const [smsSeccess, setSeccess] = useState("");
  try{
    let cliente=JSON.parse(localStorage.getItem("SelectedClient"));
    data1.id_consulta=cliente.id_consulta;
  }catch(exceptionVar){
    data1.id_consulta=0
  }


const [ startDate,
  setStartDate,]=useState(new Date())
  const handleSubmit = (e) => {
    alert();
  };
  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));

  },[]);
  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  
  function validateForm(){
    if(!data1.receita || data1.receita===""){
      setSmsError("Por favor preencha a receita")
      return false;
    }
    if(!data1.saldo || data1.saldo===""){
      setSmsError("Por favor preencha o saldo")
      return false;
    }
    if(!data1.divida || data1.divida===""){
      setSmsError("Por favor preencha o valor da divida")
      return false;
    }
    if(!data1.pfinanceiro || data1.pfinanceiro===""){
      setSmsError("Por favor preencha o patrimonio Financeiro")
      return false;
    }

    if(!data1.pimobiliario || data1.pimobiliario===""){
      setSmsError("Por favor preencha o patrimonio imobiliario")
      return false;
    }
    if(!data1.id_consulta || data1.id_consulta===0){
      setSmsError("Nenhum cliente selecionado")
      return false;
    }
    setSmsError("")
    return true;
  }

  function Register(){
    if(!validateForm() ) return false

    var data = {
      receita: data1.receita,
      saldo: data1.saldo,
      divida: data1.divida,
      patrimonio_financeiro: data1.pfinanceiro,
      patrimonio_imobiliario: data1.pimobiliario,
      data: startDate.getFullYear()+'/'+(startDate.getMonth()+1)+'/'+startDate.getDate(),
      id_consulta:data1.id_consulta
    };
    const result= axios
      .post("/candidate/RegistarProgresso", data, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        setSeccess("Registo com sucesso!")
        setUpdate(1);
        clearForm();
       // window.location.replace(true);
        return response;
        
      })
      .catch((err) => {
        setSeccess("")
        setSmsError(err.response.data.message)
        console.log("Error", err);
        return err.response;
      });
      return result;
};
function clearForm(){
  data1.receita="";
  data1.saldo="";
  data1.divida="";
  data1.pfinanceiro="";
  data1.pimobiliario="";
  setStartDate(new Date());
}
  return (
    <Card
      className={cn(styles.card, className)}
      title="Data da Análise"
      classTitle="title-purple"
      head={
          <Search className={cn(styles.search, { [styles.visible]: true })} />
    }
    >
      <div className={styles.row}>
      <div className={styles.col} style={{width:"20px !important"}}>
        <Item 
          className={styles.item}
          category="Date"
          icon="calendar"
          id="data"
          name="data"
          value={startDate && format(startDate, "MMMM dd, yyyy")}
          visible={visibleDate}
          setVisible={setVisibleDate}
          onChange={onChangeData}
        ></Item>
        <div className={styles.date}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormatCalendar={"MMMM yyyy"}
              inline
              value={data1.data}
            />
        </div>
      </div>
      <div className={styles.col}>
      <div className={styles.price}>
        <TextInput
          className={styles.field}
          label="Receita"
          name="receita"
          type="number"
          tooltip="Small description"
          required
          currency="$"
          onChange={onChangeData}
          value={data1.receita}
        />
        
        <div className={styles.fieldset}>
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="Saldo"
            name="saldo"
            type="number"
            required
            currency="$"
            onChange={onChangeData}
          value={data1.saldo}
          />
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="Dívidas"
            name="divida"
            id="divida"
            type="number"
            required
            currency="$"
            onChange={onChangeData}
          value={data1.divida}
          />
        </div>
        <div className={styles.row}>
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="Patrimônio Financeiro "
            name="pfinanceiro"
            id="pfinanceiro"
            type="number"
            required
            currency="$"
            onChange={onChangeData}
            value={data1.pfinanceiro}
          /> 
            
          <TextInput
            className={styles.field}
            classLabel={styles.label}
            label="Patrimônio Imobilizado"
            name="pimobiliario"
            id="pimobiliario"
            type="number"
            required
            currency="$"
            onChange={onChangeData}
          value={data1.pimobiliario}
          style={{marginLeft:"10px"}}
          />
        </div>
        <br></br>
        
          
          
            {smsSeccess!=="" && <p style={{color:"green"}}>{smsSeccess}</p> }
              
            
            {smsError!=="" && <p style={{color:"red"}}>{/*<Icon name="close-circle" size="24" />*/}{smsError}</p>}
                
            
          
       
        <hr></hr>
        <br></br>
        <div  className={styles.row}>
        <button className={cn("button", styles.button)} onClick={Register}>
          <span>Enviar Dados</span>
        </button>
        </div>
      </div>
      </div>
      </div>
      
      
      
    </Card>
  );
};

export default FormAnalise;

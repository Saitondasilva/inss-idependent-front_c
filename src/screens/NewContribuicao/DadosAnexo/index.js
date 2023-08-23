import React, { useState, useEffect } from "react";
import cn from "classnames";
import TextInput from "../../../components/TextInput";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import styles from "./NameAndDescription.module.sass";
import axios from "axios";
import Icon from "../../../components/Icon";

const DynamicTwoInput =({ className, data1, setData1 }) =>{
    const [content, setContent] = useState();
    const [data,setData]=useState([{fname:"",lname:"",Valor:""}])
    const [optionsGenero, setOptionsGenero] = useState(['--Documento--', 'BI', 'Cédula Pessoal', 'Cartão Estrangeiro']);
    const [genero, setGenero] = useState(optionsGenero[0]);

  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }


    const handleClick=()=>{
        setData([...data,{fname:"",lname:"",Valor:""}])
    }
    const handleChange=(e,i)=>{
        const {name,value}=e.target
        const onchangeVal = [...data]
        onchangeVal[i][name]=value
        setData(onchangeVal)
    }
    const handleDelete=(i)=>{
        const deleteVal = [...data]
        deleteVal.splice(i,1)
        setData(deleteVal)
    }
    function getGenero(){
      return axios
      .get("/getGenero")
      .then((response) => {
         var a = new Array();
        for(var i=0; i<response.data.data.length; i++){
          a.push(response.data.data[i].descricao)
        }
        setOptionsGenero(a);
        setGenero([optionsGenero[0]])
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
    }

    useEffect(() => {
      getGenero()
     
    },[]);
  

    return(
      <Card
    
      title="Transação"
      classTitle="title-green"  
    >

            <button className={styles.field1} onClick={handleClick} >ADD</button>
            {
                data.map((val, i)=>
               
                  <div className={styles.description}>
      
                  <div className={styles.group}>
                  <span className={styles.field}>
                  <Dropdown
            className={styles.field1}
            label="Ano"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            setValue={setGenero}
            options={optionsGenero}
            onChange={data1.banco=genero}
            value={genero}      
          />  </span>

          <span className={styles.field}>
            
            <Dropdown
              className={styles.field1}
              label="Mês"
              tooltip="Maximum 100 characters. No HTML or emoji allowed"
              setValue={setGenero}
            options={optionsGenero}
            onChange={data1.banco=genero}
            value={genero}
            /> 
            </span>

           

                  <TextInput
                     className={styles.field}
                    label="Valor Mensal"
                    name="Valor"
                    type="text"
                    required
                    onChange={onChangeData}
                    
                  />
                    {/*<button className={styles.field2}  onClick={()=>handleDelete(i)}>Delete</button>*/}
                </div>
                </div>
                 
                )
            }
           {/*<p>{JSON.stringify(data)}</p>*/}
        
       
    </Card>
  );
}
export default DynamicTwoInput;
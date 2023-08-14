import React, { useState } from "react";
import cn from "classnames";
import TextInput from "../../../components/TextInput";
import Card from "../../../components/Card";
import styles from "./NameAndDescription.module.sass";
import axios from "axios";
import Icon from "../../../components/Icon";

function DynamicTwoInput(){
    const [data,setData]=useState([{fname:"",lname:"",Valor:""}])
   
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
  

    return(
      <Card
    
      title="Transação"
      classTitle="title-green"  
    >

<div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>



        <div className="App">
            <button className={styles.field} onClick={handleClick}><Icon name="add" size="24" />add</button>
            {
                data.map((val,i)=>
                <div>
                  <span className={styles.field}>
                   <TextInput
       className={styles.field}
          label="Anexo"
          name="fname"
          type="file"
          required  
          /></span>
        <TextInput
          
          label="Código Transação"
          name="lname"
          type="text"
          required          
        />

        <TextInput
          
          label="Valor do talao"
          name="Valor"
          type="text"
          required
          
        />
                    <button onClick={()=>handleDelete(i)}>Delete</button>
                </div>
                )
            }
           {/*<p>{JSON.stringify(data)}</p>*/}
        </div>
        </div>
      
    
       
      </div>
    </Card>
  );
}
export default DynamicTwoInput;
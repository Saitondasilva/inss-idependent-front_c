import React, { useState, useEffect } from "react";
import cn from "classnames";
import TextInput from "../../../components/TextInput";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import styles from "./NameAndDescription.module.sass";
import axios from "axios";
import Icon from "../../../components/Icon";

function DynamicTwoInput({ className, data, setData }){
    
    const handleClick=()=>{
        setData([...data,{ano:"",mes:"",valor_pago:""}])
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
    
      title="Detalhes da Transação"
      classTitle="title-green"  
    >

  <div className="App">
            <button onClick={handleClick}><Icon name="add" size="24" />add</button>
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
          className={styles.field1}           className={styles.field}
                    label="Valor Mensal"
                    name={"valor_pago"}
                    type="text"
                    value={data.valor_pago}
          onChange={(e) => handleChange(e, i)} 
          required
                    onChange={onChangeData}
                    style={{flex: "0 0 calc(90% - 12px)",width: "calc(90% - 12px)",margin: "0 2px 10px", display:"flex"}}
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
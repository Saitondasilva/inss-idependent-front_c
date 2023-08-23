import React, { useState } from "react";

import TextInput from "../../../components/TextInput";
import Card from "../../../components/Card";
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
                data.map((val,i)=>
                <div className={styles.description}>            
        <div className={styles.group}>
               
        <TextInput
        className={styles.field1}
          label="Ano"
          name={"ano"}
          type="text"
          value={data.ano}
          onChange={(e) => handleChange(e, i)} 
          required   
          style={{flex: "0 0 calc(90% - 12px)",width: "calc(90% - 12px)",margin: "0 2px 10px", display:"flex"}}       
        />
        <TextInput
        className={styles.field1}
          label="Mes"
          name={"mes"}
          type="text"
          value={data.mes}
          onChange={(e) => handleChange(e, i)} 
          required  
          style={{flex: "0 0 calc(90% - 12px)",width: "calc(90% - 12px)",margin: "0 2px 10px", display:"flex"}}        
        />

        <TextInput
          className={styles.field1}
          label="Valor do talao"
          name={"valor_pago"}
          type="text"
          value={data.valor_pago}
          onChange={(e) => handleChange(e, i)} 
          required
          style={{flex: "0 0 calc(90% - 12px)",width: "calc(90% - 12px)",margin: "0 2px 10px", display:"flex"}}
        />
                    <button onClick={()=>handleDelete(i)}>Delete</button>
                </div>
                </div>
                )
            }
           {/*<p>{JSON.stringify(data)}</p>*/}
        </div>
       
    </Card>
  );
}
export default DynamicTwoInput;
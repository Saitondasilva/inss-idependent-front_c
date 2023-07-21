import React, {useState} from "react";
import styles from "./Anotacao.module.sass";
import cn from "classnames";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Loader from "../../../components/Loader";

const Anotacao = ({data1, setData1, SaveAnotacaoSessao, ActualSessao, smsError, smsSucess, loader,proximaSessao}) => {

  const [content, setContent] = useState();
  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  
  return (
    <div style={{width: "900px"}}>
      <div className={cn("h4", styles.info)}>Nova Anotação</div>
         {proximaSessao.descricao}  
      <div className={styles.text}>
        
      <TextInput
          className={styles.field}
          label="Nota *"
          name="nota"
          type="text"
          required
          onChange={onChangeData}
          value={data1.nota}
        />  
        <Editor
          state={content}
          onChange={setContent}
          classEditor={styles.editor}
          label="Descrição"
          name="descricao"
          value={data1.descricao}
          />
          <TextInput
          className={styles.field}
          label="Foto"
          name="foto"
          type="file"
          required
          onChange={onChangeData}
          value={data1.foto}
        />    
        <TextInput
          className={styles.field}
          label="Documento"
          name="doc"
          type="file"
          required
          onChange={onChangeData}
          value={data1.doc}
        />  
      </div>
      <div className={styles.foot}>
         {loader && <Loader className={styles.loader} />} 
          {smsSucess!=="" && <p style={{color:"green"}}>{smsSucess}</p>}
        {smsError!=="" && <p style={{color:"red"}}>{smsError}</p>}
        <button className={cn("button-stroke-red", styles.button)} onClick={()=>SaveAnotacaoSessao(ActualSessao)}>Salvar</button>
      </div>
      
    </div>
  );
};

export default Anotacao;

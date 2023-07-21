import React, {useState, useEffect} from "react";
import styles from "./Vermais.module.sass";
import cn from "classnames";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";


const blobFile= (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    resolve(event.target.result)
  };
  reader.readAsDataURL(file);
  })
const Vermais = ({data1, setData1, SaveAnotacaoSessao, ActualSessao, setVisibleVermaisModal}) => {
  console.log("ActualSessao=",ActualSessao);
  const [content, setContent] = useState();
  const [blob, setBlob] = useState('');
  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  function onChangeFile(e) {
    
   blobFile(e.target.files[0])
      .then(dataUri => {
        data1.doc=dataUri
        setBlob(dataUri)
        setData1(data1)
       /* setData1((data1) => ({
          ...data1,
          [e.target.name]: e.target.value,
        }));*/
      })
  }
  useEffect(() => { 
    if(content!==undefined){
      const contentState = content.getCurrentContent().getPlainText();
      data1.descricao=contentState;
    }
  },[content]);

  function getTypeFromDataUrl(dataUrl) {
    const match = dataUrl.match(/^data:(.*?)(;base64)?,/);
    if (!match) {
      throw new Error('Invalid data URL');
    }
    return match[1];
  }
 
  return (
    <div style={{width: "1200px"}}>
      <div className={cn("h4", styles.info)}>Detalhes da {ActualSessao.descricao}  </div>
          
      <div className={styles.text}>
      {/*<img width="1200" height="500" src={blob} alt="avatar" style={{margin:"0px auto" }}/>*/}
      {
        blob &&
        (
          <div>
            <embed src={blob} type="application/pdf" width="1200" height="500px" />
            <button className={cn("button-small", styles.button)}>
                <Icon name="download" size="24" />
                <span>Baixar agora</span>
            </button>
          </div>
        
        )
      }
      
      {ActualSessao.item.map((x, index) => (
        <div className={styles.date}>
          {x.descricao }
        </div>
      ))
      }  
      </div>
      ANEXOS
      <div className={styles.info}>
        {ActualSessao.arquive.map((x, index) => (
         x.arquive !== "undefined" &&
            <div className={styles.date} style={{margin: "5px", float: "left", cursor: "pointer"}}>
              {getTypeFromDataUrl(x.arquive) ==="application/pdf" ?
              (<img src="/images/pdf.png" width="60" height="60" onClick={()=>setBlob(x.arquive)}/>):
              (<img width="80" height="60" src={x.arquive} onClick={()=>setBlob(x.arquive)}/>)
              }
            </div>
          ))
        } 
      </div>
      
      <div className={styles.foot}>
        <button className={cn("button-stroke-red", styles.button)} onClick={()=>setVisibleVermaisModal(false)}>Fechar</button>
      </div>
      
    </div>
  );
};

export default Vermais;

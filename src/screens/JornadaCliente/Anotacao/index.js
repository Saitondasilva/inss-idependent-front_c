import React, {useState, useEffect} from "react";
import styles from "./Anotacao.module.sass";
import cn from "classnames";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Loader from "../../../components/Loader";
import axios from "axios";

const blobFile= (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    resolve(event.target.result)
  };
  reader.readAsDataURL(file);
  })
const Anotacao = ({data1, setData1, SaveAnotacaoSessao, ActualSessao, smsSucess, smsError,setSmsSucess,setSmsError, proximaSessao,dellFile,id_consulta,userData, getSessao}) => {

  const [content, setContent] = useState();
  const [loader, setLoader] = useState(false);
 // const [smsError, setSmsError] = useState(false);
  //const [smsSucess, setSmsSucess] = useState(false);
  //const [blob, setBlob] = useState('');

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
        //data1.doc=dataUri
       // setBlob(dataUri)
        addFile(ActualSessao,dataUri)
        ///setData1(data1)
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

  function addFile(sessao, blob){
    setLoader(true)
    const formData = new FormData();
    //formData.append('descricao', data1.descricao);
    formData.append('id_sessao', sessao.id);
    formData.append('arquive', blob);
    formData.append('id_consult', id_consulta);
    //formData.append('type', data1.doc.type);
    return axios
      .post("/candidate/addFileAnotationSessao/", formData ,{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        
       console.log(' Aquivo adicionado com sucesso!')
       
       getSessao(userData);
       
       setLoader(false);
       setSmsSucess('Arquivo adicionado com sucesso!');
       setSmsError("");
      })
      .catch((err) => {
        setSmsSucess("");
        setSmsError("Formato incorreto!\n Não foi possivel enviar arquivo");
        setLoader(false)
        console.log("err", err);
        return err.response;
      });
   
  }
  return (
    <div style={{width: "900px"}}>
      <div className={cn("h4", styles.info)}>Nova Anotação</div>
         {proximaSessao.descricao}  
      <div className={styles.text}>
        {/*
      <TextInput
          className={styles.field}
          label="Titulo da Nota *"
          name="nota"
          type="text"
          required
          onChange={onChangeData}
          value={data1.nota}
        />  
        */}
        <Editor
          state={content}
          onChange={setContent}
          classEditor={styles.editor}
          label="Descrição"
          name="descricao"
          
         // value={data1.descricao}
          />
          <TextInput
          className={styles.field}
          label="+ Foto"
          name="foto"
          content="files"
          type="file"
          required
          onChange={onChangeFile}
        />    
        <TextInput
          className={styles.field}
          label="+ Documento"
          name="doc"
          type="file"
          required
          onChange={onChangeFile}
        />  
      </div>
      {loader && <Loader className={styles.loader} />} 
          {smsSucess!=="" && <p style={{color:"green"}}>{smsSucess}</p>}
        {smsError!=="" && <p style={{color:"red"}}>{smsError}</p>}
        <br></br>
      ANEXOS
      <div className={styles.info}>
        {ActualSessao.arquive.map((x, index) => (
         x.arquive !== "undefined" &&
            <div className={styles.date} style={{margin: "5px", float: "left", cursor: "pointer"}}>
              {getTypeFromDataUrl(x.arquive) ==="application/pdf" ?
              (<img src="/images/pdf.png" width="60" height="60" />):
              (<img width="80" height="60" src={x.arquive} />)
              }
            </div>
          ))
        } 
      </div>
      
     {/* <img width="200" height="200" src={data1.doc} alt="avatar"/>
      <embed src={data1.doc} type="application/pdf" width="200" height="200" /> */}
      <div className={styles.foot}>
      
        <button className={cn("button-stroke-red", styles.button)} onClick={()=>SaveAnotacaoSessao(ActualSessao)}>Salvar</button>
      </div>
      
    </div>
  );
};

export default Anotacao;

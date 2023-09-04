import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import axios from "axios";


const NameAndDescription = ({ className, data1,data,setData, setData1 }) => {
  const [content, setContent] = useState();
  const [detalhes_pagamentos, setDetalhes_pagamentos] = useState();
  const [optionsForma, setOptionsForma] = useState(['Transferencia Bancária', 'Deposito']);
  const [forma, setForma] = useState(optionsForma[0]);
  const [optionsBanco, setOptionsBanco] = useState(['--Banco--','AFRILAND','ECOBANK','BGFI']);
  const [banco, setBanco] = useState(optionsBanco[0]);
  const [bancoID, setBancoID] = useState([]);

  data1.descricao=content;


  function onChangeData(e) {
    console.log(e)
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  
  function getBanco(){
    return axios
    .get("/getBanco")
    .then((response) => {
       var a = new Array();
       var b = new Array();
      for(var i=0; i<response.data.data.length; i++){
        a.push(response.data.data[i].nome)
        b.push(response.data.data[i].id)
      }
      setOptionsBanco(a);
      setBancoID(b);
      setBanco([optionsBanco[0]])
    })
    .catch((err) => {
      console.log("Error", err);
      return err.response;
    });
  }
  useEffect(() => {   
   getBanco()
  },[]);
  useEffect(() => {   
    calcularMesesAPagar()
   },[data1.id_utente]);
  useEffect(() => {
    var position        =   optionsBanco.indexOf(banco);
        data1.banco_id=bancoID[position];
  }, [banco]);

  const handleFileChange = (event) => {
    data1.anexo=event.target.files[0];
  };


function calcularMesesAPagar(){
  var valor_total = data1.valor_total;
  var valorPrestacaoMensal = data1.valorPrestacaoMensal;
  var array_data = [];
  var valor_em_falta= data1.valorPrestacaoMensal-data1.SomaPagUltimoMes;
  var UltimoAnoPago= data1.UltimoAnoPago;
  var UltimoMesPago= data1.UltimoMesPago;
   // Converta valor_total para um número
   valor_total = parseFloat(valor_total);

    if (valor_total === '0.00') {
      return false;
    }
   // Verifique se valor_total é um número válido
   if (isNaN(valor_total)) {
     // Trate o caso em que valor_total não é um número válido
     valor_total = '0.00'
     console.error('valor total não é um número válido.');
     //return false;
   }
 
   // Formate o valor_total para aceitar apenas milésimas (duas casas decimais)
  // valor_total = valor_total.toFixed(2);
 

  if(!data1.TemContribuicao){
    
    var dias_de_atraso = 31 - data1.UltimoDiaPago;
    var valor_diario_a_pagar= valorPrestacaoMensal/30
    var valor_total_a_pagar= (valor_diario_a_pagar*dias_de_atraso)

    if(valor_total>=valor_total_a_pagar){
    valor_total-=valor_total_a_pagar
    array_data.push({ano:UltimoAnoPago, mes:UltimoMesPago, valor_pago: parseFloat(valor_total_a_pagar).toFixed(2)});
    }else{
      array_data.push({ano:UltimoAnoPago, mes:UltimoMesPago, valor_pago: parseFloat(valor_total).toFixed(2)});
      valor_total='0.00';
    }
  }
  if( data1.TemContribuicao && data1.SomaPagUltimoMes<valorPrestacaoMensal){ 
    if(valor_total>=valor_em_falta){
      valor_total-=valor_em_falta;
      array_data.push({ano:UltimoAnoPago, mes:UltimoMesPago, valor_pago: parseFloat(valor_em_falta).toFixed(2)});
    }else{
      array_data.push({ano:UltimoAnoPago, mes:UltimoMesPago, valor_pago: parseFloat(valor_total).toFixed(2)});
      valor_total='0.00';
    }
      
  }
  while(valor_total>'0.00'){
    UltimoMesPago++;
    if (UltimoMesPago > 12) {
      UltimoMesPago = 1;
      UltimoAnoPago++;
    }
    if(valor_total>=valorPrestacaoMensal){
      
      array_data.push({ ano: UltimoAnoPago, mes: UltimoMesPago, valor_pago: parseFloat(valorPrestacaoMensal).toFixed(2) });
      valor_total -= valorPrestacaoMensal;
      
    }else{
      array_data.push({ ano: UltimoAnoPago, mes: UltimoMesPago, valor_pago: parseFloat(valor_total).toFixed(2)});
      valor_total='0.00';
    }
  };
    //data1.mesesAPagar=data1.valor_total
    //data.push(array_data)
    setData(array_data);
    data1.vistoDetalhe=true;
}

  return (
    <Card
      className={cn(styles.card, className)}
      title="Transação"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
      <hr></hr>
      <div className={styles.group}>

  <span className={styles.field}>
  
  <Dropdown
     className={styles.field1}
     label="Forma de pagamento Contribuição"
     setValue={setForma}
     options={optionsForma}
     onChange={data1.forma_transacao=forma}
     value={forma}
   /> 
  </span>
  <span className={styles.field}>
       <Dropdown
          className={styles.field1}
          label="Banco"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          setValue={setBanco}
          options={optionsBanco}
          onChange={data1.banco=banco}
          value={banco}
        /> 
       </span>
        
   <TextInput
          className={styles.field}
          label="Data de Transação *"
          name="data_transacao"
          type="date"
          required
          onChange={onChangeData}
          value={data1.data_transacao}
        />
 <TextInput
          className={styles.field}
          label="Codigo de Transação *"
          name="codigo_transacao"
          type="text"
          required
          onChange={onChangeData}
          value={data1.codigo_transacao}
        />
      <TextInput
          className={styles.field}
          label="Valor Total Pago (Dbs) *"
          name="valor_total"
          type="number"
          required
          onChange={onChangeData}
          value={data1.valor_total}
          onKeyUp={calcularMesesAPagar}
          onClick={calcularMesesAPagar}
        />
        <TextInput
          className={styles.field}
          label="Comprovativo de Pagamento"
          name="comprovativo_pagamento"
          type="file"
          onChange={handleFileChange}
          required
        />
      
        
      </div>
             
      </div>
    </Card>
  );
};

export default NameAndDescription;
import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";
import InputMask from 'react-input-mask';
import Modal from "../../../components/Modal";
import EditProduto from "./EditProduto";

const optionsTipoPagamento = ["Cartão", "Boleto", "Pix"];
const optionsTipoPagamento1 = [1, 2, 3];

 
const socials = [
  {
    icon: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
  {
    icon: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    icon: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
];

const NameAndDescription = ({ className, data1, setData1,user }) => {
  const [content, setContent] = useState();
  const [tipoPagamento, setTipoPagamento] = useState(optionsTipoPagamento[0]);
  const [optionsPlanejamento, setOptionsPlanejamento] = useState(["Panejamento Financeiro", "Planejamento "]);
  const [planejamento, setPlanejamento] = useState(optionsPlanejamento[0]);
  const [visibleEdit, setVisibleEdit] = useState(false);

  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }
  var sorting1=null;

  useEffect(() => {
    var position        =   optionsTipoPagamento.indexOf(tipoPagamento);
        sorting1        =   optionsTipoPagamento1[position];
        data1.tipoPagamento=sorting1;
  }, [tipoPagamento]);
  return (
    <Card
      className={cn(styles.card, className)}
      title="Configuração de Cobrança"
      classTitle="title-green"
      
    >
      <div className={styles.description}>
      <Dropdown
              className={styles.field}
              label="Planejamento Financeiro *"
              setValue={setPlanejamento}
              options={optionsPlanejamento}
              value={planejamento}
            /> 
          
        <label>Produtos:</label>
        <div className={styles.wrapper}>
          <div className={styles.table}>
            <div className={styles.row}>
              <div className={styles.col}>Nome</div>
              <div className={styles.col}>Quantidade Ciclos</div>
              <div className={styles.col}>Preço</div>
              <div className={styles.col}>Desconto</div>
              <div className={styles.col}></div>
            </div>
            {socials.map((x, index) => (
              <div className={styles.row} key={index}>
                <div className={styles.col}>Planejamento Financeiro</div>
                <div className={styles.col}>por 1 periodo</div>
                <div className={styles.col}>R$ 300 </div>
                <div className={styles.col}></div>
                <div className={styles.col}>
                    <button className={cn("button", styles.button)} onClick={()=>setVisibleEdit(true)}  style={{width: "auto", height: "auto", fontSize: "13px"}}>
                      <Icon name="edit" size="12" />
                      <span>editar</span>
                    </button>
                </div>
                  
              </div>
            ))}
          </div>
          <br/>
          <Link className={cn("button", styles.button)} onClick={()=>setVisibleEdit(true)}  style={{width: "auto", height: "auto", fontSize: "13px"}}>
            <Icon name="add" size="12" />
            <span>Adicionar produto</span>
          </Link>
          
          <div className={styles.field}>
            <TextInput
              className={styles.field}
              label="Data de inicio" 
              name="data111"
              type="date"
              required
              onChange={onChangeData}
              value={data1.data111}
              style={{width: "250px"}}
            />
          </div>
          <div className={styles.field}>
            <TextInput
              className={styles.field}
              label="Dia de cobrança" 
              name="data112"
              type="number"
              required
              onChange={onChangeData}
              value={data1.data111}
              style={{width: "250px"}}
            />
          </div>
          <span className={styles.field}>
          <Dropdown
              className={styles.field1}
              label="Metodo de pagamento"
              setValue={setPlanejamento}
              options={optionsPlanejamento}
              value={planejamento} 
            /> 
          </span>
        
      </div>
      
       
      </div>

      <Modal
        outerClassName={styles.outer}
        visible={visibleEdit}
        onClose={() => {setVisibleEdit(false);}}
      >
        <EditProduto data1={data1} setData1={setData1} />
      </Modal>
    </Card>
  );
};

export default NameAndDescription;

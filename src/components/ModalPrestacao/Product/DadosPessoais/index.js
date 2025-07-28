import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../../components/Card";
import TextInput from "../../../../components/TextInput";
import axios from "axios";
import Tooltip from "../../../Tooltip";
import Switch from "../../../Switch";
import Loader from "../../../Loader";

const NameAndDescription = ({ className, item }) => {
  const [detalhesMensais, setDetalhesMensais] = useState([]);
  const [APagar, setAPagar] = useState(0);
  const [TotalAPagar, setTotalAPagar] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [resolution, setResolution] = useState(false);
  const [userData, setuserData] = useState({});
  const [valido, setValido] = useState(item.id_estado);
  const [smsError, setSmsError] = useState("");
  const [smsSucess, setSmsSuccess] = useState("");
  const [smsResponse, setSMSResponse] = useState("");
  const [loader, setLoader] = useState(false);
  const [showCalculo, setShowCalculo] = useState(false);

  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    const user = localStorage.getItem("userData");
    setuserData(user ? JSON.parse(user) : {});
    getDocAnexo();
    if (valido > 1) setResolution(true);
    ApresentarCalculo();
  }, []);

  function getDocAnexo() {
    return axios
      .get("/getPrestAnexo/" + item.id)
      .then((response) => {
        if (response.data.data.length > 0) {
          setData(response.data.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  }

  const openFile = async (anexoId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/utente/anexoP/${anexoId}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );

      if (!response.ok) throw new Error("Falha ao baixar o arquivo.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");
      if (!newWindow) throw new Error("Não foi possível abrir nova aba.");
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  function ValidaCalculo() {
    if (resolution) return false;
    const confirmed = window.confirm(
      "Tem certeza que desejas validar esse processo?"
    );
    const data = {
      valor_calculado: APagar,
      valor_proposto: data1.vProposto,
      valor_final: TotalAPagar,
    };

    if (confirmed) {
      return axios
        .post("/utente/validarCalculo/" + item.id, data, {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((response) => {
          const rs = response.data;
          setSmsSuccess(rs.message);
        })
        .catch((err) => {
          console.log("Error", err);
          return err.response;
        });
    }
  }

  function ApresentarCalculo() {
    return axios
      .get("/utente/calculoPedido/" + item.id, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        const rs = response.data.data.details_mensal;
        const apagar = response.data.data.total_apagar;
        setDetalhesMensais(rs);
        setAPagar(apagar);
        setTotalAPagar(apagar);
        setShowCalculo(true);
        if (apagar === 0) {
          setSMSResponse(
            "Utente não Possui Prazo de Garantia para este pedido!"
          );
        }
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
  }

  function RecusarProcesso() {
    if (!data1.observacao || data1.observacao === "") {
      alert("Por favor preencha o campo observação");
      return false;
    }

    setLoader(true);

    return axios
      .patch("/utente/nvalidarUtente/" + item.id, data1, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        setSmsError("");
        setSmsSuccess("Observação enviada com sucesso");
        setLoader(false);
        setData1((prev) => ({ ...prev, observacao: "" }));
      })
      .catch((err) => {
        setSmsSuccess("");
        setSmsError("Erro: " + err);
        setLoader(false);
        return err.response;
      });
  }

  return (
    <Card
      className={cn(styles.card, className)}
      title="Detalhes da Prestação"
      classTitle="title-green"
    >
      <div className={styles.description}>
        <h2 className={styles.title}>Dados Pessoais</h2>
        <hr />
        <div className={styles.group}>
          <div className={styles.field}>
            <h4>Nome do Beneficiário: {item.nome}</h4>
            <hr />
            <p>NIF do Beneficiario: {item.nif}</p>
            <hr />
            <p>Codigo : {item.codigo}</p>
            <hr />
          </div>
          <div className={styles.field}>
            <p>Banco: {item.nome_banco}</p>
            <hr />
            <p>NIB: {item.nib}</p>
            <hr />
            <p>IBAN: {item.iban}</p>
            <hr />
            <p>Numero de Conta Bancária: {item.n_conta}</p>
            <hr />
          </div>
        </div>
      </div>

      <div className={styles.description}>
        <h2 className={styles.title}>Informações da Prestação</h2>
        <hr />
        <p>
          Tipo Prestação:{" "}
          <span style={{ color: "#FF6A55" }}>{item.descr_prestacao}</span>
        </p>
        <hr />
        <p>Numero de Dias: {item.n_dias}</p>
        <hr />
      </div>

      {!((item.valor_final * 1) > 0) && (
        <div className={styles.description}>
          <h2 className={styles.title}>Cálculo</h2>
          <hr />
          <button
            className={cn("button", styles.button)}
            onClick={ApresentarCalculo}
          >
            <span className={styles.field}>Apresentar Cálculo</span>
          </button>
          <br />

          {showCalculo && (
            <div className={styles.description}>
              <div className={styles.group}>
                <div className={styles.field}>Mês/Ano</div>
                <div className={styles.field}>Valor</div>
              </div>
              <hr />
              {detalhesMensais.slice(0, 7).map((val, i) => (
                <React.Fragment key={i}>
                  <div className={styles.group}>
                    <div className={styles.field}>
                      {val.mes}/{val.ano}
                    </div>
                    <div className={styles.field}>{val.valor}</div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      <p>
        Valor Calculado:{" "}
        <span style={{ color: "#FF6A55" }}>
          {TotalAPagar || item.valor_final || "N/A"}
        </span>
      </p>
      <hr />

      <div className={styles.description}>
        <div className={styles.group}>
          <div className={styles.field}>
            <TextInput
              className={styles.field1}
              label="Valor Proposto"
              name="vProposto"
              type="number"
              required
              value={data1.vProposto || ""}
              onChange={onChangeData}
            />
            <TextInput
              className={styles.field1}
              label="Caso não, Envia uma observação"
              name="observacao"
              type="text"
              required
              value={data1.observacao || ""}
              onChange={onChangeData}
            />

            <div className={styles.description}>
              <h2 className={styles.title}>Anexos</h2>
              <hr />
              <div className={styles.group}>
                {data.map((val, i) => (
                  <div className={styles.col} key={i}>
                    <div className={styles.row}>
                      <button
                        className={cn("button", styles.button)}
                        onClick={() => openFile(val.id)}
                      >
                        <span className={styles.field}>{val.tipo_anexo}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.info}>
              {loader && <Loader className={styles.loader} />}
              {smsSucess && <p style={{ color: "green" }}>{smsSucess}</p>}
              {smsError && <p style={{ color: "red" }}>{smsError}</p>}
            </div>
            <br />
            <button
              className={cn("button-stroke-red", styles.button)}
              onClick={RecusarProcesso}
            >
              Recuar Processo
            </button>
          </div>

          <div className={styles.field}>
            <button
              className={cn("button-stroke-green", styles.button)}
              onClick={ValidaCalculo}
            >
              Validar & Avançar
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NameAndDescription;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./print.css"; // Arquivo de CSS só para impressão

const ImprimirPrestacao = () => {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const token = user?.token;

    axios
      .get(`/utente/getallpedidoprestacaoById/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setDados(res.data.data?.pedido_prestacao || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p>A carregar dados...</p>;
  if (!dados) return <p>Erro ao carregar dados da prestação.</p>;

  return (
    <div className="print-container">
      <div className="print-content">
        <h2 style={{ textAlign: "center" }}>REPÚBLICA DEMOCRÁTICA DE SÃO TOMÉ E PRÍNCIPE</h2>
        <h3 style={{ textAlign: "center" }}>INSTITUTO NACIONAL DE SEGURANÇA SOCIAL</h3>
        <hr />

        <p><strong>Ao Beneficiário:</strong> {dados.nome}</p>
        <p><strong>Residência:</strong> {dados.morada || "________"}</p>
        <p><strong>Profissão:</strong> {dados.profissao || "VENDEDORA AMBULANTE"}</p>
        <p><strong>Assunto:</strong> Inscrição do Utente</p>

        <p>
          Serve a presente para comunicar a V.EX.ª que a partir de <strong>{formatarData(dados.created_at)}</strong> 
          encontra-se inscrito(a) no Regime de Segurança Social dos Trabalhadores Independentes 
          sob o Número <strong>{dados.codigo}</strong>.
        </p>

        <p>Com os nossos melhores cumprimentos,</p><br />
        <p><strong>O Responsável</strong></p>
        <p><strong>Data:</strong> {formatarData(dados.created_at)}</p><br /><br />

        <p style={{ fontSize: "12px", marginTop: "40px" }}>
          Rua Engº Salustino da Graça - Caixa Postal 145<br />
          Tel. 2224603 / Fax 2234609<br />
          Email: inss@cstome.net<br />
          São Tomé e Príncipe
        </p>
      </div>

      <div className="no-print" style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={handlePrint} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Imprimir
        </button>
      </div>
    </div>
  );
};

const formatarData = (data) => {
  if (!data) return "";
  const d = new Date(data);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export default ImprimirPrestacao;



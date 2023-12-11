import React, { useState, useEffect } from 'react';
import Dropdown from "../../components/Dropdown";
import Table from "../../components/Table";
import cn from "classnames";
import axios from "axios";
const MyComponent = () => {
  const [optionsGenero, setOptionsGenero] = useState([]);
  const [genero, setGenero] = useState('');
  const [tableData, setTableData] = useState([]);

  const fetchGeneroOptions = async () => {
    try {
      const response = await fetch('/getPrestacao');
      const data = await response.json();
      setOptionsGenero(data);
    } catch (error) {
      console.error('Erro ao obter opções de gênero:', error);
    }
  };

  const handleGeneroChange = (selectedGenero) => {
    setGenero(selectedGenero);
  };

  const fetchDataBasedOnGenero = async () => {
    try {
      const response = await fetch(`sua_url_da_api/dados?genero=${genero}`);
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Erro ao obter dados da tabela:', error);
    }
  };

  useEffect(() => {
    fetchGeneroOptions();
  }, []);

  useEffect(() => {
    if (genero) {
      fetchDataBasedOnGenero();
    }
  }, [genero]);

  return (
    <div>
      <Dropdown
       
        label="Tipo de Prestação"
        setValue={handleGeneroChange}
        options={optionsGenero}
        value={genero}
        style={{ width: '250px' }}
      />
      
      <button onClick={fetchDataBasedOnGenero}>Pesquisar</button>

      {/*<Table data={tableData} />*/}
    </div>
  );
};

export default MyComponent;
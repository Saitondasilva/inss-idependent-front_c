import React, { useState } from 'react';

const EsconderMostrarDiv = () => {
  const [divVisivel, setDivVisivel] = useState(null);

  const handleClick = (nomeDiv) => {
    setDivVisivel(nomeDiv === divVisivel ? null : nomeDiv);
  };

  return (
    <div>
      <button onClick={() => handleClick('div1')}>Mostrar Div 1</button>
      <button onClick={() => handleClick('div2')}>Mostrar Div 2</button>
      <button onClick={() => handleClick('div3')}>Mostrar Div 3</button>

      {divVisivel === 'div1' && <div>Conteúdo da Div 1</div>}
      {divVisivel === 'div2' && <div>Conteúdo da Div 2</div>}
      {divVisivel === 'div3' && <div>Conteúdo da Div 3</div>}
    </div>
  );
};

export default EsconderMostrarDiv;
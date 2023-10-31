
import React, {useRef}from 'react';
import {useReactToPrint} from 'react-to-print';
//import ComponentToPrint from './DadosPessoais';

const ReactePDFPrint = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: ()=>alert('print sucess')
  
  });


  return (
    <> <div ref={componentRef} style={{width: '100%', height: 'window.innerHeigh'}}>
      <h1>Employee data</h1> 
  </div> 
  <button onClick={handlePrint}>Print this out</button>
  </>
   
  );
};

export default ReactePDFPrint ;
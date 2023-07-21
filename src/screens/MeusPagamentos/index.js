import React, {useState, useEffect} from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import styles from "./Payouts.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PayoutHistory from "./PayoutHistory";

const Payouts = () => {
  const [paid, setPaid]= useState(false)
  const [loader, setLoader]= useState(false)
  const {id_type_user}=useParams();
  const product={
    price: 1,
    description:"teste de pagamento para finmap"
  }
  useEffect(()=>{
    const script =document.createElement("script");
    const id= "AbMCsfenOi_-4W1CDYNIxZxu6qEHsZVeh37Xyw5Va9FRLsoqUyO34XoyMo5zkYZUpNDYDykLxwDIFMW3"
    script.src=`https//www.paypal.com/sdk/js?currency=BRL#client-id=${id}`
  
    script.addEventListener("load",()=>setLoader(true));
    document.body.appendChild(script);

    if(loader){
      //function loadButtons
    }
  })
  return (
    <>
      <div className={styles.section}>
        <Overview className={styles.card} />
        <PayoutHistory id_type_user={id_type_user? Number.parseInt(id_type_user):null}/>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Payouts;

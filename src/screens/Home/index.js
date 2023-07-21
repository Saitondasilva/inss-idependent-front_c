import React, {useState, useEffect} from "react";
import cn from "classnames";
import styles from "./Home.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PopularProducts from "../../components/PopularProducts";
import Comments from "./Comments";
import RefundRequests from "../../components/RefundRequests";
import ProTips from "./ProTips";
import MoreCustomers from "./MoreCustomers";
import ProductViews from "./ProductViews";

function getNameMounth(n){
  if(n===1) return "Janeiro";
  if(n===2) return "Fevereiro";
  if(n===3) return "Março";
  if(n===4) return "Abril";
  if(n===5) return "Maio";
  if(n===6) return "Junho";
  if(n===7) return "Julho";
  if(n===8) return "Agosto";
  if(n===9) return "Setembro";
  if(n===10) return "Outubro";
  if(n===11) return "Novembro";
  if(n===12) return "Dezembro";
}
const Home = () => {

  const [userData1, setuserData] = useState(() =>
  JSON.parse(localStorage.getItem("userData")) ||{ });

  useEffect(() => {
    var user = localStorage.getItem("userData");
   if(user!=null)setuserData(JSON.parse(user));
},[]);
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <Overview className={styles.card} userData={userData1}/>
          <ProductViews className={styles.card} getNameMounth={getNameMounth} userData={userData1}/>
        </div>
        <div className={styles.col}>
          <PopularProducts className={styles.card} getNameMounth={getNameMounth} views="4" userData={userData1} />
        </div>
      </div>
      <TooltipGlodal />
    </>
  );
};

export default Home;

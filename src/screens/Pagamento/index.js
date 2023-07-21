import React from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import styles from "./Payouts.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import PayoutHistory from "./PayoutHistory";

const Payouts = () => {
  const {id_type_user}=useParams();
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

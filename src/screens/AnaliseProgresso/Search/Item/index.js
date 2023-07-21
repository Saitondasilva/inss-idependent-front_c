import React from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Icon from "../../../../components/Icon";

const Item = ({ className, item, onClick }) => {
  return (
    <div className={cn(styles.item, className)}>
      <div className={styles.link} onClick={onClick}>
        <div className={styles.preview}>
          <img srcSet={`${"http://127.0.0.1:8000"+item.photo} 2x`} src={"http://127.0.0.1:8000"+item.photo} alt="Product" />
        </div>
        <div className={styles.details}>
          <div className={styles.content}>{item.first_name+ ' '+item.last_name}</div>
          <div className={styles.title}>{item.email}</div>
        </div>
      </div>
      <button className={styles.close}>
        <Icon name="close" size="24" />
      </button>
    </div>
  );
};

export default Item;

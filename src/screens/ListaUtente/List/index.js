import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./List.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Actions from "../../../components/Actions";
import Loader from "../../../components/Loader";
import Item from "./Item";
import axios from "axios";

// data
import { notifications } from "../../../mocks/notifications";

const intervals = ["Recent", "New", "This year"];

const actions = [
  {
    title: "Mark as read",
    icon: "check",
    action: () => console.log("Mark as read"),
  },
  {
    title: "Go setting",
    icon: "setting",
    action: () => console.log("Go setting"),
  },
];

const List = ({ className }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [notifications, setNotifications] = useState([]);
  const [userData, setuserData] = useState({});
  
  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    getNotification(JSON.parse(user));
  },[]);
  
  function getNotification(user){
    const result= axios
      .get("/candidate/getallnotification",{
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setNotifications(response.data);
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title=""
      classTitle={cn("title-red", styles.title)}
      classCardHead={styles.head}
      /*
      head={
        <>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sorting}
            setValue={setSorting}
            options={intervals}
            small
          />
          <Actions
            className={styles.actions}
            classActionsHead={styles.actionsHead}
            items={actions}
          />
        </>
      }
      */
    >
      {/*<div className={styles.notifications}>
        <div className={styles.list}>
          {notifications.map((x, index) => (
            <Item className={cn(styles.item, className)} item={x} key={index} />
          ))}
        </div>
        <div className={styles.foot}>
          <button className={cn("button-stroke button-small", styles.button)}>
            <Loader className={styles.loader} />
            <span>Load more</span>
          </button>
        </div>
          </div>*/}
    </Card>
  );
};

export default List;

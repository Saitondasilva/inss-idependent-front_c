import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Item from "./Item";
import axios from "axios";

// data

const actions = [
  {
    title: "Mark as read",
    icon: "check",
    action: () => console.log("Mark as read"),
  },
  {
    title: "Delete notifications",
    icon: "trash",
    action: () => console.log("Delete notifications"),
  },
];

const Notification = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userData, setuserData] = useState({});
  const [styleActive, setstyleActive] = useState(false);

  useEffect(() => {
    var user = localStorage.getItem("userData"); 
    user==null?setuserData([]):setuserData(JSON.parse(user));
    getNotification(JSON.parse(user));
    notReadyCount(JSON.parse(user));
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

  function MarkAsRead_all(){
    const result= axios
      .get("/candidate/MarkAsRead_all",{
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((response) => {
        setstyleActive(false);
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
  }

  function notReadyCount(user){
    const result= axios
      .get("/candidate/notreadnotificationcount",{
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        if(response.data.data.total>0)
        setstyleActive(true);
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.notification, className, {
          [styles.active]: visible,
        })}
      >
        <button
          className={cn(styles.head, styleActive? styles.active : styles.inactive )}
         
          onClick={() => {setVisible(!visible); MarkAsRead_all()}}
        >
          <Icon name="notification" size="24" />
          <span>Notificação</span>

          
        </button>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.title}>Notificação</div>
            {/*
            <Actions
              className={styles.actions}
              classActionsHead={styles.actionsHead}
              items={actions}
              small
            />
            */}
          </div>
          <div className={styles.list}>
            {/*notifications.map((x, index) => (
              
              <Item
                className={cn(styles.item, className)}
                item={x}
                key={index}
                onClose={() => setVisible(false)}
              />
            ))*/}
          </div>
          <Link
            className={cn("button", styles.button)}
            to="/notification"
            onClick={() => setVisible(false)}
          >
           Validar Cadastro
          </Link>
          <Link
            className={cn("button", styles.button)}
            to="/notification"
            onClick={() => setVisible(false)}
          >
            Corrigir Cadastro
          </Link>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;

import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Market.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Actions from "../../../components/Actions";
import Loader from "../../../components/Loader";
import Item from "./Item";
import axios from "axios";
import Icon from "../../../components/Icon";

// data

const intervals = ["Recentes", "Não lidas"];

const actions = [
  {
    title: "Marcar como lidas",
    icon: "check",
    action: () => console.log("Mark as read"),
  },
  {
    title: "Eliminar todas",
    icon: "Delete",
    action: () => console.log("Go setting"),
  },
];

const List = ({ className }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [notifications, setNotifications] = useState([]);
  const [userData, setuserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
     // Chama getNotification quando o componente é montado
     getNotification(JSON.parse(user), currentPage).then((paginationInfo) => {
      setTotalPages(Math.ceil(paginationInfo.total / paginationInfo.per_page));
    });
  },[]);
  useEffect(() => {
    
    handleChangeDropdown()
  },[sorting]);
  function getNotification(user,page = 1){
    const page_size = 10; // Número de itens por página
    const result= axios
      .get(`/utente/getallnotification?page=${page}&page_size=${page_size}`,{
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        const { data, total, per_page, current_page } = response.data;
  
        setNotifications(data); // Define os dados da notificação
  
        return { total, per_page, current_page };
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
  };
  function getNaoLidas(user,page = 1){
    const page_size = 10; // Número de itens por página
    const result= axios
      .get(`/utente/getnotreadnotification?page=${page}&page_size=${page_size}`,{
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        const { data, total, per_page, current_page } = response.data;
  
        setNotifications(data); // Define os dados da notificação
  
        return { total, per_page, current_page };
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
      return result;
  };
  function handleChangeDropdown(){
    console.log("Sorting", sorting);
    
    if(sorting==="Recentes"){
      getNotification(userData)
    }else if(sorting==="Não lidas"){
      getNaoLidas(userData)
    }
    
  }
  const handlePageChange = (newPage) => {
    
    var user = localStorage.getItem("userData");
    user==null?setuserData([]):setuserData(JSON.parse(user));
    console.log("USER",user)
    console.log("TOTALPAGES",totalPages)
    console.log("NEWPAGES",newPage)
    if (newPage >= 1 && newPage <= totalPages) {
      getNotification(JSON.parse(user), newPage).then(() => {
        setCurrentPage(newPage);
      });
    }
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title={sorting}
      classTitle={cn("title-red", styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            value={sorting}
            setValue={setSorting}
            options={intervals}
            onChange={()=>handleChangeDropdown()}
          />
          <Actions
            className={styles.actions}
            classActionsHead={styles.actionsHead}
            items={actions}
          />
        </>
      }
      
    >
      <div className={styles.notifications}>
        <div className={styles.list}>
          {notifications.map((x, index) => (
            <Item className={cn(styles.item, className)} item={x} key={index} />
          ))}
        </div>
       
      <div className={styles.foot}>
        <button className={styles.arrow} onClick={() => handlePageChange(currentPage - 1)}>
          <Icon name="arrow-left" size="20" />
        </button>
        {currentPage} / {totalPages}
        <button className={styles.arrow} onClick={() => handlePageChange(currentPage + 1)}>
          <Icon name="arrow-right" size="20"  />
        </button>
      </div>
      </div>

      
    </Card>
  );
};

export default List;

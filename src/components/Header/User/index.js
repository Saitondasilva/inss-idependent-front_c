import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import  {createSlice} from '@reduxjs/toolkit';


const items = [
  {
    menu: [
     
      {
        title: "Edit profile",
        url: "/settings",
      },
    ],
  },
  
  {
    menu: [
      {
        title: "Log out",
        url: "/sign-in",
  
      },
    ],
  },
];


  
 
const User = ({ className }) => {
  const [visible, setVisible] = useState(false);
   const navigate= useNavigate()

  const logout=()=>{ 
    
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    const initialState = {

      state: {
          isFetching: false,
      },
      user:{
    name:"finmap",
    isAuthenticated:false
  },
  }
  
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setIsFetching : (state) => {
          state.state.isFetching = true;
    }, 
    }  
  });
    console.log("Logout")
   }
  
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className, { [styles.active]: visible })}>
        <button className={styles.head} onClick={() => setVisible(!visible)}>
          <img src="/images/content/avatar.jpg" alt="Avatar" />
        </button>
        <div className={styles.body}>
        <NavLink
                    className={cn(styles.item)}
                    activeClassName={styles.active}
                    onClick={() => logout()}
                    key={0}
                  >
                 
                    Log out
                  </NavLink>
          {/*items.map((item, index) => (
            <div className={styles.menu} key={index}>
              {item.menu.map((x, index) =>
                x.url ? (
                  <NavLink
                    className={cn(styles.item, { [styles.color]: x.color })}
                    activeClassName={styles.active}
                    to={x.url}
                    onClick={() => setVisible(false)}
                    key={index}
                  >
                    {x.icon && <Icon name={x.icon} size="24" />}
                    {x.title}
                  </NavLink>
                ) : (
                  <button
                    className={styles.item}
                    onClick={() => setVisible(false)}
                    key={index}
                  >
                    ppppp
                  </button>
                )
              )}
            </div>
          ))*/}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default User;

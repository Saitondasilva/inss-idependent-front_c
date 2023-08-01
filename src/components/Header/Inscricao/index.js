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


  
 
const Inscricao = ({ className }) => {
  const [visible, setVisible] = useState(false);
   const navigate= useNavigate()

  
  
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className, { [styles.active]: visible })}>
        <button className={styles.head} onClick={() => {setVisible(!visible)}}>

          
        <Icon name="ticket" size="24" />
         <label>Cadastro</label>
        
        </button>
        <div className={styles.body}>
        <NavLink
                    className={cn(styles.item)}
                    activeClassName={styles.active}
                    to="/cliente/add"
                    key={0}
                  >                 
                    Inscricao Beneficiário
        </NavLink>

                  <NavLink
                    className={cn(styles.item)}
                    activeClassName={styles.active}
                    to="/Agregado/add"
                    key={0}
                  >                 
                    Inscricao Agregado
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

export default Inscricao;

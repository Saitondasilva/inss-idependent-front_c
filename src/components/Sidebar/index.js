import React, { useState,useEffect } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Help from "./Help";
import Image from "../Image";


const Sidebar = ({className, onClose }) => {
  const [visibleHelp, setVisibleHelp] = useState(false);
  const [visible, setVisible] = useState(false);

  var user = localStorage.getItem("userData");
  var userData=JSON.parse(user);
var navigation=[];

 navigation = [
  {
    title: "Home",
    icon: "home",
    url: "/home",
  },
  {
    title: "Pesquisa Utente",
    icon: "search",
    url: "/utente/lista",
  },
  {
    title: "Contribuições",
    icon: "diamond",
    slug: "income",
    dropdown: [
      {
        title: "Listagem Geral",
        url: "/contribuicao/utente",
      },
      {
        title: "Listagem por Mês",
        url: "/contribuicao/utente/PorMes",
      },
    ],
  },
 
  {
    title: "Lista Pensionista",
    icon: "heart-fill",
    url: "/customers/overview",
  }, 
 
  {
    title: "Consulta Processo",
    icon: "pie-chart",
    url: "/membro/Processo",
  },
  {
    title: "Prestação",
    slug: "income",
    icon: "setting",
    dropdown: [
      {
        title: "Tecnico de Prestação",
        url: "/Prestacao/Calculo/type/1",
      },
      {
        title: "Chefe de Prestação",
        url: "/payment/user/type/2",
      }
    ],
  },

  /*{
    title: "Estatística",
    url: "/income/earning",
    icon: "activity",
  },*/
  /*{
    title: "Autorizações",
    slug: "income",
    icon: "lock",
    dropdown: [
      {
        title: "Autorização DG",
        url: "/payment/user/type/1",
      },      
      {
        title: "Autorização DSS",
        url: "/payment/user/type/3",
      },
      
    ],
  },*/

  {
    title: "Pagamentos das Atribuições",
    slug: "income",
    icon: "activity",
    dropdown: [
      {
        title: "Autorização DAF",
        url: "/Pagamento/autor/2",
      },      
      {
        title: "Pagamentos",
        url: "/Pagamento/1",
      },
     
    ],
  },

  /*{
    title: "Parametrização",
    slug: "income",
    icon: "setting",
    dropdown: [
      {
        title: "Abertura e Fecho do Ano",
        url: "/payment/user/type/1",
      },
      {
        title: "Profissões",
        url: "/payment/user/type/2",
      },
      {
        title: "Bancos",
        url: "/payment/user/type/3",
      },
      {
        title: "Unidade de Conta",
        url: "/payment/user/type/4",
      }
    ],
  },*/
  {
    title: "Utilizador",
    url: "/user/admin",
    icon: "setting",
    colorCounter: "#B5E4CA",
  },
  
 
  {
    title: "teste",
    icon: "calendar",
    url: "/agenda/profissional",
  },
/*

  {
    title: "Products",
    slug: "products",
    icon: "diamond",
    add: true,
    dropdown: [
      {
        title: "Dashboard",
        url: "/products/dashboard",
      },
      {
        title: "Drafts",
        url: "/products/drafts",
        counter: "2",
        colorCounter: "#FFBC99",
      },
      {
        title: "Released",
        url: "/products/released",
      },
      {
        title: "Comments",
        url: "/products/comments",
      },
      {
        title: "Scheduled",
        url: "/products/scheduled",
        counter: "8",
        colorCounter: "#B5E4CA",
      },
    ],
  },
  {
    title: "Customers",
    slug: "customers",
    icon: "profile-circle",
    dropdown: [
      {
        title: "Overview",
        url: "/customers/overview",
      },
      {
        title: "Customer list",
        url: "/customers/customer-list",
      },
    ],
  },
  {
    title: "Shop",
    icon: "store",
    url: "/shop",
  },
  {
    title: "Income",
    slug: "income",
    icon: "pie-chart",
    dropdown: [
      {
        title: "Earning",
        url: "/income/earning",
      },
      {
        title: "Refunds",
        url: "/income/refunds",
      },
      {
        title: "Payouts",
        url: "/income/payouts",
      },
      {
        title: "Statements",
        url: "/income/statements",bom
      },
    ],
  },
  {
    title: "Pagamentos",
    slug: "income",
    icon: "pie-chart",
    dropdown: [
      {
        title: "Clientes",
        url: "/payment/user/type/1",
      },
      {
        title: "Profissionais",
        url: "/payment/user/type/2",
      },
      {
        title: "Empresas",
        url: "/payment/user/type/3",
      }
    ],
  },
  {
    title: "Promote",
    icon: "promotion",
    url: "/promote",
  },{
    title: "Users",
    url: "/user/admin",
    icon: "promotion",
    colorCounter: "#B5E4CA",
  },
  {
    title: "Subscribes",
    url: "/subscribes",
    icon: "promotion",
    colorCounter: "#B5E4CA",
  },
  {
    title: "Contacto",
    url: "/contactos",
    icon: "promotion",
    colorCounter: "#B5E4CA",
  },
  {
    title: "Profissional",
    url: "/profissional",
    icon: "promotion",
    colorCounter: "#B5E4CA",
  },
  {
    title: "Membros",
    url: "/membro",
    icon: "promotion",
    colorCounter: "#B5E4CA",
  },
  */
];


  return (
    <>
      <div
        className={cn(styles.sidebar, className, { [styles.active]: visible })}
      >
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="24" />
        </button>
        <Link className={styles.logo} to="/" onClick={onClose}>
        {/*
          <Image
            className={styles.pic}
            src="/images/n_logo_inss.png"
            srcDark="/images/n_logo_inss.png"
            alt="SITI"
               />
               */}
              <span className={styles.name}>SITI</span> 
        </Link>
        
        <div className={styles.menu}>
          {navigation.map((x, index) =>
            x.url ? (
              <NavLink
                className={styles.item}
                activeClassName={styles.active}
                to={x.url}
                key={index}
                exact
                onClick={onClose}
              >
                <Icon name={x.icon} size="24" />
                {x.title}
              </NavLink>
            ) : (
              <Dropdown
                className={styles.dropdown}
                visibleSidebar={visible}
                setValue={setVisible}
                key={index}
                item={x}
                onClose={onClose}
              />
            )
          )}
        </div>
        <button className={styles.toggle} onClick={() => setVisible(!visible)}>
          <Icon name="arrow-right" size="24" />
          <Icon name="close" size="24" />
        </button>
        <div className={styles.foot}>
          {/*
          <button className={styles.link} onClick={() => setVisibleHelp(true)}>
            <Icon name="help" size="24" />
            Help & getting started
            <div className={styles.counter}>8</div>
          </button>
          */}
          <Theme className={styles.theme} visibleSidebar={visible} />
        </div>
      </div>
      <Help
        visible={visibleHelp}
        setVisible={setVisibleHelp}
        onClose={onClose}
      />
      
     
    </>
  );
};

export default Sidebar;

import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import Item from "../Item";
import TextInput from "../../../components/TextInput";
import axios from "axios";

const Login = ({ className,user }) => {
  const [data1, setData1] = useState({});
  const [errorsms, seterrorsms] = useState("");
  const [userData, setuserData] = useState({});

  useEffect(() => {
    user==null?setuserData({}):setuserData(JSON.parse(user));
    console.log("Login Information")
    console.log(user);
  }, [user]);

  function onChangeData(e) {
    setData1((data1) => ({
      ...data1,
      [e.target.name]: e.target.value,
    }));
  }

  function changePassword(){
    if(data1.new_password===""){
      return seterrorsms("Por favor preencha a nova password");
    }
    if(data1.new_password!==data1.confirm_password){
      return seterrorsms("Passwords não se coescidem");
    }
    
    var data = {
       old: data1.old_password,
       new: data1.new_password,
     };
       return axios
         .patch("/admin/"+userData.id+"/password", data,{
          headers: { Authorization: `Bearer ${userData.token}` },
        })
         .then((response) => {
          seterrorsms("Passwords alteradas com sucesso!")
           console.log(response);
           return response;
           
         })
         .catch((err) => {
          
           console.log("Error", err);
           seterrorsms(err.response.data.message);
           return err.response;
         });
   };
  return (
    <Item
      className={cn(styles.card, className)}
      title="Login"
      classTitle="title-purple"
    >
      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          label="Old password"
          id="old_password"
          name="old_password"
          type="password"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
          onChange={onChangeData}
          value={data1.old_password}
        />
        <div className={styles.row}>
          <TextInput
            className={styles.field}
            label="New password"
            name="new_password"
            id="new_password"
            type="password"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            required
            onChange={onChangeData}
            value={data1.new_password}
          />
          <TextInput
            className={styles.field}
            label="Confirm new password"
            name="confirm_password"
            id="confirm_password"
            type="password"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            required
            onChange={onChangeData}
            value={data1.confirm_password}
          />
          
        </div>
        <div className='text-danger'>{errorsms}</div>
        <button className={cn("button-stroke", styles.button)} onClick={changePassword}>
          Update password
        </button>
      </div>
    </Item>
  );
};

export default Login;

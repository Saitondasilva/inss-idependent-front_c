import React, { useState,useEffect } from "react";
import cn from "classnames";
import styles from "./ProfileInformation.module.sass";
import Item from "../Item";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";

const ProfileInformation = ({ className, user}) => {
  const [content, setContent] = useState();
  const [userData, setuserData] = useState(null);
 
  useEffect(() => {
    user==null?setuserData(user):setuserData(JSON.parse(user));
    console.log("Profissional Information")
    console.log(user);
  }, [user]);
  if(userData!=null)
  return (
    <Item
      className={cn(styles.card, className)}
      title="Profile information"
      classTitle="title-green"
    >
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src="/images/content/avatar.jpg" alt="Avatar" />
          <button className={styles.remove}>
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.file}>
          <input type="file" />
          <button className={cn("button", styles.button)} type="button">
            <Icon name="add" size="24" />
            <span>Upload new picture</span>
          </button>
        </div>
        <button className={cn("button-stroke", styles.button)}>Remove</button>
      </div>
      <div className={styles.fieldset}>
        <TextInput
          className={styles.field}
          label="First name"
          name="display-name"
          type="text"
          value={userData.name}
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        <TextInput
          className={styles.field}
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          required
        />
        
        
      </div>
      <div className="row"><br></br>
        <button className={cn("button", styles.button)}>Save</button>
      </div>
      
    </Item>
    
  );
  else return(<></>);
};

export default ProfileInformation;

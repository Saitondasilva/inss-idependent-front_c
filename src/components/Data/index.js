import React, { useState } from "react";
import styles from "./Schedule.module.sass";
import cn from "classnames";
import Item from "./Item";
import Icon from "../Icon";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Form1 from "../Form";
import Card from "../Card";

const Schedule = ({
  className,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
}) => {
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);

  const handleClick = () => {
    setStartDate(null);
    setTimeout(() => setStartDate(new Date()), 10);
    setVisibleDate(false);
  };
  const handleSubmit = (e) => {
    alert();
  };

  return (
    <Card
    className={cn(styles.card, className)}
    title="Data da Análise"
    classTitle="title-purple"

  >
    <div className={cn(styles.schedule, className)}>
      <Form1
              className={styles.form}
              value=""
              setValue=""
              onSubmit={() => handleSubmit()}
              placeholder="Procurar cliente"
              type="text"
              name="search"
              icon="search"
            />
      </div>
      <div className={styles.list}>
        <Item
          className={styles.item}
          category="Date"
          icon="calendar"
          value={startDate && format(startDate, "MMMM dd, yyyy")}
          visible={visibleDate}
          setVisible={setVisibleDate}
        >
          <div className={styles.date}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormatCalendar={"MMMM yyyy"}
              inline
            />
            <div className={styles.foot}>
              <button
                className={cn("button-stroke button-small", styles.button)}
                onClick={() => handleClick()}
              >
                Clear
              </button>
              <button
                className={cn("button-small", styles.button)}
                onClick={() => setVisibleDate(false)}
              >
                Close
              </button>
            </div>
          </div>
          
        </Item>
    </div>
  
    </Card>
  );
};

export default Schedule;

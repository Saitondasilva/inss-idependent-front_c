import React, { useState } from "react";
import styles from "./Schedule.module.sass";
import cn from "classnames";
import Item from "./Item";
import Icon from "../Icon";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

const Schedule = ({
  className,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  action
}) => {
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTimeIn, setVisibleTimeIn] = useState(false);
  const [visibleTimeOut, setVisibleTimeOut] = useState(false);

  const handleClick = () => {
    setStartDate(null);
    setTimeout(() => setStartDate(new Date()), 10);
    setVisibleDate(false);
  };

  return (
    <div className={cn(styles.schedule, className)}>
      <div className={cn("title-red", styles.title)}>Disponibilidade para consulta</div>
      <div className={styles.note}>
        Selecione o dia e a hora para uma possivel consulta
      </div>
      <div className={styles.list}>
        <Item
          className={styles.item}
          category="Data"
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
        <Item
          className={styles.item}
          category="Hora de Inicio"
          icon="clock"
          value={startTime && format(startTime, "h:mm aa")}
          visible={visibleTimeIn}
          setVisible={setVisibleTimeIn}
        >
          <div className={styles.time}>
            <div className={styles.top}>
              <div className={styles.subtitle}>
                {startTime && format(startTime, "h:mm aa")}
              </div>
              <button
                className={styles.close}
                onClick={() => setVisibleTimeIn(false)}
              >
                <Icon name="close" size="20" />
              </button>
            </div>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption={false}
              dateFormat="h:mm aa"
              inline
            />
          </div>
        </Item>
        <Item
          className={styles.item}
          category="Hora de Fim"
          icon="clock"
          value={endTime && format(endTime, "h:mm aa")}
          visible={visibleTimeOut}
          setVisible={setVisibleTimeOut}
        >
          <div className={styles.time}>
            <div className={styles.top}>
              <div className={styles.subtitle}>
                {endTime && format(endTime, "h:mm aa")}
              </div>
              <button
                className={styles.close}
                onClick={() => setVisibleTimeOut(false)}
              >
                <Icon name="close" size="20" />
              </button>
            </div>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption={false}
              dateFormat="h:mm aa"
              inline
            />
          </div>
        </Item>
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={action}>Guardar</button>
      </div>
    </div>
  );
};

export default Schedule;

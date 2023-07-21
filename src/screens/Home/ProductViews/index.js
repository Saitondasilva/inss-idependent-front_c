import React, { useState,useEffect } from "react";
import styles from "./ProductViews.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "use-dark-mode";
import axios from "axios";

const intervals     =   ["Ultimos 12 meses", "Ultimos 6 meses", "Ultimos 18 meses"];
const intervals1    =   [12, 6, 18];
 
const ProductViews = ({ className, getNameMounth,userData }) => {
  const darkMode = useDarkMode(false);
  const [sorting, setSorting] = useState(intervals[0]);
  const [data1, setData1] = useState([]);

  var sorting1=null;


  useEffect(() => {
    var position        =   intervals.indexOf(sorting);
        sorting1        =   intervals1[position];
        AllCountYearMounth(userData,sorting1);
  }, [sorting]);
  useEffect(() => {

    AllCountYearMounth(userData,intervals1[0]);
  }, []);

  function AllCountYearMounth(user,limit) {
    var vetor_total=[];
    return axios
      .get("/candidate/AllMouthCountContractActive/"+limit,{
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        vetor_total=response.data.data.total;
        vetor_total.map((x, index) => (
          vetor_total[index].name=getNameMounth(x.name)
        ))
        setData1(vetor_total);
       
        return response;
      })
      .catch((err) => {
        console.log("Error", err);
        return err.response;
      });
};
  return (
    <Card
      className={cn(styles.card, className)}
      title="Faturamento"
      classTitle="title-purple"
      head={
        <Dropdown
          className={styles.dropdown}
          classDropdownHead={styles.dropdownHead}
          value={sorting}
          setValue={setSorting}
          options={intervals}
          small
        />
      }
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data1}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barSize={42}
            barGap={8}
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke={darkMode.value ? "#272B30" : "#EFEFEF"}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
              padding={{ left: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: "500", fill: "#6F767E" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#272B30",
                borderColor: "rgba(255, 255, 255, 0.12)",
                borderRadius: 8,
                boxShadow:
                  "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 0px 1px #000000",
              }}
              labelStyle={{ fontSize: 12, fontWeight: "500", color: "#fff" }}
              itemStyle={{
                padding: 0,
                textTransform: "capitalize",
                fontSize: 12,
                fontWeight: "600",
                color: "#fff",
              }}
              cursor={{ fill: "#f3f2f3" }}
            />
            <Bar dataKey="views" fill="#B5E4CA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProductViews;

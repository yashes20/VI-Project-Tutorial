import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LimitCategorical from "../limits/limitCategorical";

const CustomBarChart = (props) => {
  const [records, setRecords] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    if (props.records.length > 0) {
      let namesSet = Array.from(
        new Set(props.records.map((item) => item[props.xAxis])),
        (el) => {
          return { name: el, value: true };
        }
      ).sort((a, b) => (a.name < b.name ? -1 : 1));

      setNames(namesSet);
      getGM(namesSet);
    }
  }, []);

  const getGM = (filter) => {
    var result1 = [];

    Object.values(
      props.records.reduce((acc, value) => {
        if (
          filter.find(
            (el) => el.name == [value[props.xAxis]] && el.value == true
          )
        ) {
          if (!acc[value[props.xAxis]]) {
            let obj = {};
            obj[props.xAxis] = value[props.xAxis];
            obj[props.orderField] = value[props.orderField];
            obj[props.lineKey] = 0;
            acc[value[props.xAxis]] = obj;
            result1.push(acc[value[props.xAxis]]);
          }

          acc[value[props.xAxis]][props.lineKey] += value[props.lineKey];
        }
        return acc;
      }, {})
    );
    let orderResults = result1.sort((a, b) => {
      return a[props.orderField] < b[props.orderField] ? -1 : 1;
    });
    setRecords(orderResults);
  };

  const onChangeCheckBox = (name) => {
    let newName = names.find((el) => el.name == name);
    newName.value = !newName.value;
    setNames(names);
    getGM(names);
  };

  return (
    <>
      <p className="title-paragraph bold">
        {props.xAxis} vs {props.yAxis}
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={records}
          margin={{
            top: 5,
            right: 30,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={props.xAxis} />
          <YAxis
            dataKey={props.yAxis}
            label={{
              value: props.yAxis,
              position: "left",
              angle: "-90",
              offset: "35",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey={props.lineKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <LimitCategorical records={names} onChangeCheckBox={onChangeCheckBox} />
    </>
  );
};
export default CustomBarChart;

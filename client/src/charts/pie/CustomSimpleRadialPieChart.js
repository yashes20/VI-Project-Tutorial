import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

import LimitCategorical from "../limits/limitCategorical";

const CustomSimpleRadialPieChart = (props) => {
  const [records, setRecords] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    if (props.records.length > 0) {
      let namesSet = Array.from(
        new Set(props.records.map((item) => item[props.field])),
        (el) => {
          return { name: el, value: true };
        }
      );
      setNames(namesSet);
      getCountFromField(namesSet);
    }
  }, []);

  const getCountFromField = (filter) => {
    let array = [];

    props.records.map((record) => {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      let foundElem = array.find((elem) => elem.name == record[props.field]);
      if (foundElem) {
        foundElem.value += 1;
      } else if (
        filter.find(
          (el) => el.name == [record[props.field]] && el.value == true
        )
      ) {
        array.push({
          name: record[props.field],
          value: 1,
          fill: "#" + randomColor,
        });
      }
    });
    setRecords(array);
  };

  const onChangeCheckBox = (name) => {
    let newName = names.find((el) => el.name == name);
    newName.value = !newName.value;
    setNames(names);
    getCountFromField(names);
  };

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  return (
    <div>
      <p className="title-paragraph bold">{props.field}</p>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          width={500}
          height={300}
          cx={150}
          cy={150}
          innerRadius={10}
          outerRadius={150}
          barSize={10}
          data={records}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            clockWise
            dataKey="value"
          />
          <Legend
            iconSize={10}
            width={120}
            height={140}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <LimitCategorical records={names} onChangeCheckBox={onChangeCheckBox} />
    </div>
  );
};

export default CustomSimpleRadialPieChart;

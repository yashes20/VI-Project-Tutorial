import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import LimitCategorical from "../limits/limitCategorical";

const CustomPieChart = (props) => {
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
      let foundElem = array.find((elem) => elem.name == record[props.field]);
      if (foundElem) {
        foundElem.value += 1;
      } else if (
        filter.find(
          (el) => el.name == [record[props.field]] && el.value == true
        )
      ) {
        array.push({ name: record[props.field], value: 1 });
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

  return (
    <>
      <div className="d-block" style={{ width: "100%", height: "270px" }}>
        <p className="title-paragraph bold">{props.field}</p>
        <ResponsiveContainer width="100%" height="55%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={records}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill={props.color}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <LimitCategorical records={names} onChangeCheckBox={onChangeCheckBox} />
      </div>
    </>
  );
};

export default CustomPieChart;

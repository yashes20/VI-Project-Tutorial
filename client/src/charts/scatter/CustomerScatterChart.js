import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomScatterChart = (props) => {
  const [records, setRecords] = useState([]);
  const [xAxis] = useState(props.xAxis);
  const [lineKey] = useState(props.lineKey);
  const colors = ["orange", "blue", "pink", "red", "green", "black"];

  useEffect(() => {
    if (props.records.length > 0) {
      setRecords(groupByAverage(props.xAxis, props.lineKey));
    }
  }, []);

  const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  const groupByAverage = (groupByValue, averageValue) => {
    let averageValues = props.records.reduce((previousValue, currentValue) => {
      if (!previousValue[currentValue[groupByValue]]) {
        previousValue[currentValue[groupByValue]] = {
          ...currentValue,
          count: 1,
        };
        return previousValue;
      }
      previousValue[currentValue[groupByValue]][averageValue] +=
        currentValue[averageValue];
      previousValue[currentValue[groupByValue]].count += 1;
      return previousValue;
    }, {});
    let results = Object.keys(averageValues).map(function (x) {
      const item = averageValues[x];
      let obj = {};
      obj[xAxis] = item[groupByValue];
      obj[lineKey] = item[averageValue] / item.count;
      return obj;
    });

    return results;
  };

  return (
    <div className="d-block">
      <p className="title-paragraph bold">
        {props.xAxis} vs {props.lineKey}
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          width={320}
          height={250}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 30,
          }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey={props.xAxis}
            name={props.xAxis}
            label={{ value: props.xAxis, position: "bottom" }}
          />
          <YAxis
            type="number"
            dataKey={props.lineKey}
            name={props.lineKey}
            label={{
              value: props.lineKey,
              position: "left",
              angle: "-90",
              offset: "15",
            }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="A school" data={records} fill="rgb(0, 164, 249)" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomScatterChart;

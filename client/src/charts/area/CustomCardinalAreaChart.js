import React, { useEffect, useState } from "react";
import LimitNumeric from "../limits/limitNumeric";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomCardinalAreaChart = (props) => {
  const [records, setRecords] = useState([]);
  const [xAxis] = useState(props.xAxis);
  const [lineKey] = useState(props.lineKey);
  const [minX, setMinX] = useState("");
  const [minY, setMinY] = useState("");
  const [maxX, setMaxX] = useState("");
  const [maxY, setMaxY] = useState("");

  useEffect(() => {
    if (props.records.length > 0) {
      setRecords(groupByAverage(props.xAxis, props.lineKey));
    }
  }, []);

  const setFilterList = (minX, maxX, minY, maxY) => {
    let sortedList = groupByAverage(props.xAxis, props.lineKey).sort((a, b) =>
      a[xAxis] > b[xAxis] ? 1 : -1
    );

    if (minX != "") {
      sortedList = sortedList.filter((elem) => elem[xAxis] >= minX);
    }

    if (maxX != "") {
      sortedList = sortedList.filter((elem) => elem[xAxis] <= maxX);
    }

    if (maxY != "") {
      sortedList = sortedList.filter((elem) => elem[lineKey] <= maxY);
    }

    if (minY != "") {
      sortedList = sortedList.filter((elem) => elem[lineKey] >= minY);
    }
    setRecords(sortedList);
  };

  const filterChart = (min, max, axis) => {
    if (axis == "X") {
      setMinX(min);
      setMaxX(max);
      setFilterList(min, max, minY, maxY);
    } else if (axis == "Y") {
      setMinY(min);
      setMaxY(max);
      setFilterList(minX, maxX, min, max);
    }
  };
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

    let sortedList = results.sort((a, b) => (a[xAxis] > b[xAxis] ? 1 : -1));

    return sortedList;
  };

  return (
    <>
      <p className="title-paragraph bold">
        {xAxis} vs {lineKey}
      </p>
      <div className="d-flex flex-row align-items-center">
        <div className="d-block">
          <LimitNumeric
            min={minX}
            max={maxX}
            title={xAxis}
            filterChart={filterChart}
            axis={"X"}
          />
          <LimitNumeric
            min={minY}
            max={maxY}
            title={lineKey}
            filterChart={filterChart}
            axis={"Y"}
          />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={650}
            height={400}
            data={records}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={lineKey}
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CustomCardinalAreaChart;

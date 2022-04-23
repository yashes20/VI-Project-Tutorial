import React from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const LimitCategorical = (props) => {
  return (
    <div className="filter-box">
      {props.records.map((el) => {
        return (
          <Form.Check
            inline
            id={el.name}
            label={el.name}
            key={el.name}
            defaultChecked="true"
            onChange={() => props.onChangeCheckBox(el.name)}
          />
        );
      })}
    </div>
  );
};

export default LimitCategorical;

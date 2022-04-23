import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const LimitNumeric = (props) => {
  return (
    <div className="filter-box">
      <Form>
        <Form.Label>
          Filter {props.axis} - {props.title}
        </Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Min:</Form.Label>
            <Form.Control
              type="email"
              value={props.min}
              onChange={(event) =>
                props.filterChart(event.target.value, props.max, props.axis)
              }
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Max:</Form.Label>
            <Form.Control
              type="email"
              value={props.max}
              onChange={(event) =>
                props.filterChart(props.min, event.target.value, props.axis)
              }
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

export default LimitNumeric;

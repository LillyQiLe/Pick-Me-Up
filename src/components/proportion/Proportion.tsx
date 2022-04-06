import React from 'react';
import { Button, Layout, Row, Col, Input, Table} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';

const {Header, Content, Footer} = Layout;

function Proportion() {

  return (
    <>
      <Row>
        <Col span={4} offset={2}>你在意哪些因素呢？</Col>
      </Row>
      <Row>
        <Col span={2} offset={2}>
          <Input></Input>
        </Col>
      </Row>
      <Row>
        <Col span={2} offset={2}>
          <Button>确定</Button>
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <Table></Table>
        </Col>
      </Row>
    </>
  );
}

export default Proportion;
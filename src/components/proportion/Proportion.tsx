import React from 'react';
import { Button, Layout, Row, Col} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';

const {Header, Content, Footer} = Layout;

function Proportion() {
  const dispatch = useDispatch();
  const { depositMoney, withdrawMoney, bankruptMoney } = bindActionCreators(actionCreators, dispatch);
  const amount = useSelector((state: State) => state.bank)

  return (
    <>
      <Row>
        <Col>
          {amount}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => depositMoney(100)}>DEPOSIT</Button>
          <Button onClick={() => withdrawMoney(10)}>WITHDRAW</Button>
          <Button onClick={() => bankruptMoney()}>BANKRUPT</Button>
        </Col>
      </Row>
    </>
  );
}

export default Proportion;
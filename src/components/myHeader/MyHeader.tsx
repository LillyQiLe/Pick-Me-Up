import React, { useCallback, useState } from "react";
import { Row, Col, Menu, Image } from "antd";
import logo from "../../static/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";

function MyHeader() {
  const dispatch = useDispatch();
  const { changeContent } = bindActionCreators(actionCreators, dispatch);
  const content = useSelector((state: State) => state.content);

  return (
    <>
      <Row style={{ backgroundColor: "#434655" }}>
        <Col span={6}>
          <Image src={logo} width="150px"></Image>
        </Col>
        <Col span={18}>
          <Menu
            mode="horizontal"
            style={{ backgroundColor: "#434655", color: "white" }}
            onClick={(e) => changeContent(e.key)}
          >
            <Menu.Item key={"proportion"}>因素占比</Menu.Item>
            <Menu.Item key={"score"}>裁判评分</Menu.Item>
            <Menu.Item key={"result"}>结果</Menu.Item>
            <Menu.Item key={"guide"}>使用指南</Menu.Item>
          </Menu>
        </Col>
      </Row>
    </>
  );
}

export default MyHeader;

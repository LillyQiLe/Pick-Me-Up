import React from "react";
import { Row, Col, Menu, Image } from "antd";
import logo from '../../static/images/logo.png';


function MyHeader() {
  return (
    <Row style={{backgroundColor: '#434655'}}>
      <Col span={6}>
        <Image src={logo} width='150px'></Image>
      </Col>
      <Col span={18}>
        <Menu mode="horizontal" style={{backgroundColor: '#434655', color: 'white'}}>
          <Menu.Item>因素占比</Menu.Item>
          <Menu.Item>裁判评分</Menu.Item>
          <Menu.Item>结果</Menu.Item>
          <Menu.Item>使用指南</Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
}

export default MyHeader;

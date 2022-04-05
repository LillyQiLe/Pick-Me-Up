import React, { useCallback, useState } from "react";
import { Row, Col, Menu, Image } from "antd";
import logo from "../../static/images/logo.png";
import Proportion from "../proportion/Proportion";
import Score from "../score/Result";
import Result from "../result/Result";
import Guide from "../guide/Guide";

function MyHeader() {
  const [content, setContent] = useState(<Proportion/>);

  const handleClick = useCallback((e) => {
      let key = e.key;
      setContent(key === 'proportion' ? <Proportion/> : 
                 key === 'score'  ? <Score/> : 
                 key === 'result' ? <Result/> : 
                 key === 'guide'  ? <Guide/> : <Proportion/>);
    },
    [content]
  );

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
            onClick={handleClick}
          >
            <Menu.Item key={"proportion"}>因素占比</Menu.Item>
            <Menu.Item key={"score"}>裁判评分</Menu.Item>
            <Menu.Item key={"result"}>结果</Menu.Item>
            <Menu.Item key={"guide"}>使用指南</Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {content}
        </Col>
      </Row>
    </>
  );
}

export default MyHeader;

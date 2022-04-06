import React from "react";
import { Button, Layout } from "antd";
import MyHeader from "./components/myHeader/MyHeader";
import "./App.css";
import { useSelector } from "react-redux";
import { State } from "./state";
import Proportion from "./components/proportion/Proportion";
import Score from "./components/score/Result";
import Result from "./components/result/Result";
import Guide from "./components/guide/Guide";

const { Header, Content, Footer } = Layout;

function App() {
  const content = useSelector((state: State) => state.content);

  return (
    <Layout>
      <Header style={{ padding: "0px" }}>
        <MyHeader></MyHeader>
      </Header>
      <Content>{content === 'proportion' ? <Proportion/> : 
                content === "score" ?  <Score/> :
                content === 'result' ? <Result/> :
                content === 'guide'  ? <Guide/> : <Proportion/>}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;

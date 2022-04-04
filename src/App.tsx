import React from 'react';
import { Button, Layout} from 'antd';
import MyHeader from './components/myHeader/MyHeader';
import './App.css'

const {Header, Content, Footer} = Layout;

function App() {
  return (
    <Layout>
      <Header style={{padding: '0px'}}><MyHeader></MyHeader></Header>
      <Content>content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
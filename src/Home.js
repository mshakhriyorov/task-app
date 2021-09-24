import React, { useState, useEffect } from 'react';
import { Typography, Layout, Menu, Input, Image } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { IIFC } from "react-iifc";
import axios from 'axios';


const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const { Search } = Input;

class Home extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <IIFC>
        {() => {
          const { user, isAuthenticated } = useAuth0();

          const [users, setUsers] = useState([]);

          useEffect(() => {
            axios.get('https://jsonplaceholder.typicode.com/users')
              .then(response => {
                setUsers(response.data);
              })
              .catch(error => {
                console.log(error);
              })
          })

          function onSearch() {

          }

          if (!isAuthenticated) return (
            <Title>Hello, welcome to Task Application!</Title>
          )

          return (
            <Layout>
              <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Image src={user.picture} />
                    {user.name}
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header className="site-layout-background header" style={{ padding: 0 }}>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                  })}
                  <Search placeholder="Search..." onSearch={onSearch} style={{ width: 200 }} />
                </Header>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  
                </Content>
              </Layout>
            </Layout>
          )
        }}
      </IIFC>
    );
  }
}

export default Home;

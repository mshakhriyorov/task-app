import React, { useState, useEffect } from 'react';
import { Typography, Layout, Menu, Input, Image } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { IIFC } from "react-iifc";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const { Search } = Input;

// const columns = [
//   // { dataField: 'id', text: '№', sort: true },
//   { dataField: 'name', text: 'Name', sort: true, filter: textFilter()},
//   { dataField: 'phone', text: 'Contact', sort: true },
//   { dataField: 'company.name', text: 'Company', sort: true }
// ]

// const pagination = paginationFactory({
//   page: 1,
//   sizePerPage: 5,
//   lastPageText: '>>',
//   firstPageText: '<<',
//   nextPageText: '>',
//   prePageText: '<',
//   showTotal: true,
//   alwaysShowAllBtns: true,
//   onPageChange: function (page, sizePerPage) {
//     console.log('page', page);
//     console.log('sizePerPage', sizePerPage);
//   },
//   onSizePerPageChange: function (page, sizePerPage) {
//     console.log('page', page);
//     console.log('sizePerPage', sizePerPage);
//   }
// })


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
          const [searchUser, setSearchUser] = useState("");
          const [loading, setLoading] = useState(false);
          const [data, setData] = useState(users);
          const [order, setOrder] = useState("ASC");

          const sorting = (col) => {
            if(order === "ASC") {
              const sorted = [...data].sort((a, b) => 
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
              );
              setData(sorted);
              setOrder("DSC");
            }
            else if(order === "DSC") {
              const sorted = [...data].sort((a, b) => 
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
              );
              setData(sorted);
              setOrder("ASC");
            }
          };

          useEffect(() => {
            axios.get('https://jsonplaceholder.typicode.com/users')
              .then(response => {
                setUsers(response.data);
                setLoading(false);
              })
              .catch(error => {
                console.log(error);
              })
          }, [])

          if(loading) {
            return <h1>Loading...</h1>
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
                  <Search 
                    placeholder="Search..." 
                    onChange={(event) => {
                      setSearchUser(event.target.value)
                    }} 
                    style={{ width: 200 }}  
                  />
                 
                </Header>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th onClick={()=>sorting("name")}>Name</th>
                        <th onClick={()=>sorting("phone")}>Contact</th>
                        <th onClick={()=>sorting("company.name")}>Company</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.filter(val => {
                          if(searchUser === ''){
                            return val
                          } else if(
                              val.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                              val.company.name.toLowerCase().includes(searchUser.toLowerCase())
                            ){
                            return val;
                          }
                          return false
                        }).map(kishi => (
                          <tr key={kishi.id}>
                            <td>{kishi.name}</td>
                            <td>{kishi.phone}</td>
                            <td>{kishi.company.name}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
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

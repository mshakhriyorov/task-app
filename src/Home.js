import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Image } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { IIFC } from "react-iifc";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import PreHome from './PreHome';



const { Header, Sider, Content } = Layout;
const { Search } = Input;


class Home extends React.Component {
  state = {
    collapsed: true,
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
          const [pageNumber, setPageNumber] = useState(0);

          const usersPerPage = 5;
          const pagesVisited = pageNumber * usersPerPage;
          const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).filter(val => {
            if (searchUser === '') {
              return val
            } else if (
              val.name.toLowerCase().includes(searchUser.toLowerCase()) ||
              val.company.name.toLowerCase().includes(searchUser.toLowerCase())
            ) {
              return val;
            }
            return false
          }).map(kishi => (
            <tr key={kishi.id}>
              <td>{kishi.name}</td>
              <td>{kishi.phone}</td>
              <td>{kishi.company.name}</td>
            </tr>
          ));

          const pageCount = Math.ceil(users.length / usersPerPage);
          const changePange = ({ selected }) => {
            setPageNumber(selected)
          }

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

          if (loading) {
            return <h1>Loading...</h1>
          }

          if (!isAuthenticated) return <PreHome />

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
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Company</th>
                      </tr>
                    </thead>
                    <tbody>{displayUsers}</tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={pageCount}
                    onPageChange={changePange}
                    containerClassName={'paginationBtns'}
                    previousLinkClassName={'previousBtn'}
                    nextLinkClassName={'nextBtn'}
                    disabledClassName={'pagination'}
                    activeClassName={'paginationActive'}
                  />
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

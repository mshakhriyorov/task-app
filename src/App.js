import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import "antd/dist/antd.css";
import { useAuth0 } from '@auth0/auth0-react';
import "antd/dist/antd.css";
import './App.css';


const App = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  if(isLoading) return <div className="loading"><h1>Loading...</h1></div>

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header" style={{display:'flex', alignItems:'center', justifyContent: 'space-between'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <NavLink exact activeClassName="active"  to="/" >Home</NavLink>
          </div>
         { !isAuthenticated && (<NavLink activeClassName="active"  to="/login" onClick={loginWithRedirect}  className="login">Login</NavLink>)}
         { isAuthenticated && (<NavLink activeClassName="active"  to="/logout" onClick={logout} className="logout">Log Out</NavLink>)}
        </div>
        <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

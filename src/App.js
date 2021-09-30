import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import "antd/dist/antd.css";
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Toggle from './Toggle';
import styled, { ThemeProvider } from 'styled-components';
import useDarkMode from "./useDarkMode";
import { GlobalStyles, lightTheme, darkTheme } from './globalStyles';



const Container = styled.div`
        max-width: 100%;
        margin: 0;
        color: black;
`;



const App = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();
  const [theme, toggleTheme] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;


  if (isLoading) return <div className="loading"><h1>Loading...</h1></div>

  return (
    <ThemeProvider theme={themeMode}>
      <Container>
        <div className="App">
          <BrowserRouter>
            <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NavLink exact activeClassName="active" to="/" >Home</NavLink>
                <GlobalStyles />
                <Toggle theme={theme} toggleTheme={toggleTheme} />
              </div>
              {!isAuthenticated && (<NavLink activeClassName="active" to="/login" onClick={loginWithRedirect} className="login">Login</NavLink>)}
              {isAuthenticated && (<NavLink activeClassName="active" to="/logout" onClick={logout} className="logout">Log Out</NavLink>)}
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;

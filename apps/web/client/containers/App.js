import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import styled, { injectGlobal } from 'react-emotion';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import background from '../../assets/space-miner-background.jpg';
import Error from '../components/Error';
import FourOhFourPage from '../pages/FourOhFourPage';
import Home from '../pages/Home';
import Navigation from './Navigation';
import theme from '../theme';

export default App;

injectGlobal`
body {
  background-image: url('${background}');
  background-size: cover;
  margin: 0;
  padding: 0;
}
`;

class RouteBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true, info, });
  }

  render() {
    const { hasError, info } = this.state;
    if (hasError) {
      return <Error stack={info.componentStack} />;
    }
    return this.props.children;
  }
}

const AppContent = styled.div`
  color: #fff;
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const Actions = styled.div`
  margin-right: ${p => p.isOpen ? '-24px' : 0};
`;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <MuiThemeProvider theme={theme}>
            <RouteBoundary>
              <AppContent>
                <Navigation
                  renderActions={({isOpen}) => (
                    <Actions isOpen={isOpen}>
                      <Button variant="contained" color="primary">Save</Button>
                    </Actions>
                  )}
                />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route component={FourOhFourPage} />
                </Switch>
              </AppContent>
            </RouteBoundary>
          </MuiThemeProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

import React, { Component } from 'react';
import styled, { injectGlobal } from 'react-emotion';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import background from '../../assets/space-miner-background.jpg';
import Error from '../components/Error';
import FourOhFourPage from '../pages/FourOhFourPage';
import Home from '../pages/Home';
import Navigation from './Navigation';

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

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <RouteBoundary>
            <AppContent>
              <Navigation />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route component={FourOhFourPage} />
              </Switch>
            </AppContent>
          </RouteBoundary>
        </Route>
      </Switch >
    </BrowserRouter>
  );
}

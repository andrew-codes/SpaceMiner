import Drawer from '@material-ui/core/Drawer';
import React, { Component } from 'react';
import styled, { injectGlobal } from 'react-emotion';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '../components/AppBar';
import background from '../../assets/space-miner-background.jpg';
import Error from '../components/Error';
import FourOhFourPage from '../pages/FourOhFourPage';
import Home from '../pages/Home';

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

injectGlobal`
body {
  background-image: url('${background}');
  background-size: cover;
  margin: 0;
  padding: 0;
}
`;

const AppContent = styled.div`
  color: #fff;
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const ToolbarSpacer = withTheme()(styled('div')({
}, ({ theme }) => theme.mixins.toolbar));

const styles = {
  drawerPaper: {
    position: 'relative',
    width: 240,
    background: 'rgba(0, 0, 0, 0.5)',
  },
};

function App({ classes }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <RouteBoundary>
            <AppContent>
              <AppBar />
              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <ToolbarSpacer />
              </Drawer>
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

export default withStyles(styles)(App);

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import cn from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';
import styled from 'react-emotion';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, withTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    background: 'rgba(0, 0, 0, 0.5)',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

const ToolbarSpacer = withTheme()(styled('div')({
}, ({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
})));

const MenuButton = styled(IconButton)`
  margin-right: 20px;
  display: ${p => p.isVisible === 'none' ? 'none': null};
  visibility: ${p => p.isVisible ? 'visible': 'hidden'};
`;

const BackButton = styled(IconButton)`
  color: #fff;
  display: ${p => p.isVisible === 'none' ? 'none': null};
  visibility: ${p => p.isVisible ? 'visible': 'hidden'};
`;

const SiteAppBar = withTheme()(styled(AppBar)`
  background-color: rgba(0,0,0,0.5);
  z-index: ${p => p.theme.zIndex.drawer + 1};
  transition: ${p => p.theme.transitions.create(['width', 'margin'], {
      easing: p.theme.transitions.easing.sharp,
      duration: p.theme.transitions.duration.leavingScreen,
    })}
`);

const SiteTitle = styled(Typography)`
  flex: 1;
`;

class Navigation extends Component {
  state = {
    open: false,
  };

  render() {
    const {
      classes,
      theme,
    } = this.props;
    const {
      open
    } = this.state;

    return (
      <React.Fragment>
        <SiteAppBar
          className={cn(classes.toolbar, open && classes.toolbarShift)}
          position="absolute"
        >
          <Toolbar disableGutters={!open} >
            <MenuButton
              aria-label="open navigation drawer"
              color="inherit" 
              onClick={this.handleDrawerOpen}
              isVisible={open ? 'none' : true}
            >
              <MenuIcon />
            </MenuButton>
            <SiteTitle variant="title" color="inherit">
              Space Miner
            </SiteTitle>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </SiteAppBar>
        <Drawer
          classes={{
            paper: cn(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
          variant="permanent"
        >
          <ToolbarSpacer>
              <BackButton
                isVisible={open}
                onClick={this.handleDrawerClose}
              >
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </BackButton>
          </ToolbarSpacer>
        </Drawer>
      </React.Fragment>
    );
  }

  handleDrawerOpen = evt => this.setState({ open: true });
  handleDrawerClose = evt => this.setState({ open: false });
}

export default withStyles(styles, {withTheme: true})(Navigation);

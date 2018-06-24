import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import styled from 'react-emotion';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';

export default SimpleAppBar;

const MenuButton = styled(IconButton)`
  margin-left: -12px;
  margin-right: 20px;
`;

const SiteAppBar = withTheme()(styled(AppBar)`
  background-color: rgba(0,0,0,0.5);
  z-index: ${p => p.theme.zIndex.drawer + 1};
`);

const SiteTitle = styled(Typography)`
  flex: 1;
`;

function SimpleAppBar() {
  return (
    <SiteAppBar position="absolute">
      <Toolbar>
        <MenuButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </MenuButton>
        <SiteTitle variant="title" color="inherit">
          Space Miner
        </SiteTitle>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </SiteAppBar>
  );
}

import React from 'react';
import styled from 'react-emotion';
import { withStyles, withTheme } from '@material-ui/core/styles';

export default withStyles(styles)(Page);

function styles(theme) {
  return {
    toolbar: theme.mixins.toolbar,
  };
}

const ToolbarSpacer = withTheme()(styled('div')({
}, ({ theme }) => theme.mixins.toolbar));

const Main = styled.main`
    flex-grow: 1;
    min-width: 0;
`;
const Content = withTheme()(styled.div`
padding: ${p => p.theme.spacing.unit * 3};
`);

function Page({ children, classes }) {
  return (
    <Main>
      <ToolbarSpacer />
      <Content>
        {children}
      </Content>
    </Main>
  );
}

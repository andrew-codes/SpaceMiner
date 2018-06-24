import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import App from './containers/App';

const styleNode = document.createElement('style');
styleNode.id = 'insertion-point-jss';
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create(jssPreset());
jss.options.insertionPoint = styleNode;

const HotEnabledApp = hot(module)(() => (
  <JssProvider jss={jss} generateClassName={createGenerateClassName()}>
    <App />
  </JssProvider >
));

export const render = (appEl) => {
  ReactDOM.render((
    <HotEnabledApp />
  ), appEl);
};

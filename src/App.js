// @flow
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import Login from './scenes/Login';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="Simple Login App"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Login />
    </div>
  </MuiThemeProvider>
);
export default App;

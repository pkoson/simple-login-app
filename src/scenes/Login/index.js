// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import { Map } from 'immutable';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Snackbar from 'material-ui/Snackbar';

import { API_URL } from '../../config';

const styles = {
  login: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    margin: 20,
    padding: 20,
    paddingTop: 0,
    textAlign: 'center',
    display: 'inline-block'
  },
  button: {
    margin: 12
  }
};
type PropsType = any;
export default class MyComponent extends React.Component {
  state: {
    inputData: Map<
      string,
      {
        password: string,
        email: string
      }
    >,
    sending: boolean,
    userLogged: boolean,
    user: { data: { id: number }, status: number }
  };
  constructor(props: PropsType) {
    super(props);
    this.state = {
      inputData: Map({ password: '', email: '' }),
      sending: false,
      userLogged: false,
      user: { data: { id: 0 }, status: 0 }
    };
  }
  handleInputData = (name: string, value: string) => {
    this.setState(({ inputData }) => ({
      inputData: inputData.set(name, value)
    }));
  };
  logIn = () => {
    this.setState({ sending: true });
    axios
      .post(`${API_URL}/user`, {
        email: this.state.inputData.get('email'),
        password: this.state.inputData.get('password')
      })
      .then(response => {
        this.setState({
          sending: false,
          userLogged: true,
          user: response
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div style={styles.login}>
        <Paper style={styles.paper} zDepth={2}>
          <h3>Login</h3>
          <Divider />
          <TextField
            floatingLabelText="User Name"
            onChange={e => this.handleInputData('email', e.target.value)}
            disabled={this.state.sending}
          />
          <br />
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={e => this.handleInputData('password', e.target.value)}
            disabled={this.state.sending}
          />
          <br />
          <RaisedButton
            label="Login"
            labelPosition="before"
            primary
            icon={<AccountBox />}
            style={styles.button}
            onTouchTap={() => this.logIn()}
            disabled={this.state.sending}
          />
        </Paper>
        <Snackbar
          open={this.state.userLogged}
          message={`Status: ${this.state.user.status}, ${this.state.user.status === 201 ? 'Logged!' : 'Error!'}`}
          autoHideDuration={5000}
        />
      </div>
    );
  }
}

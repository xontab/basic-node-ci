import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { login } from '../../redux/actions/authActions';

import '../../layout/styles.scss';
import styles from './styles.scss';

@connect(
  state => ({
      accessToken: state.getIn(['auth', 'accessToken']),
  }),
  {
    login,
  },
)
export default class LoginPage extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            username: '',
            password: '',
            loginFailed: false,
        };
    }

    _handleChange(field, e) {
        this.setState({
            [field]: e.target.value,
        });
    }

    _handleLoginSubmit = () => {
        const { username, password } = this.state;
        this.props.login(username, password).then(() => {
            if (this.props.accessToken.length > 0) {
                browserHistory.push('/');
            } else {
                this.setState({
                    loginFailed: true,
                })
            }
        });
    }

    _handleSnackbarClose = () => {
        this.setState({
            loginFailed: false,
        });
    };
    
    render() {
        const { username, password, loginFailed } = this.state;

        return (
            <div className={styles.loginBox}>
                <h1>Basic Node CI</h1>
                 <Snackbar
                    open={loginFailed}
                    message="Username or Password is incorrect"
                    autoHideDuration={4000}
                    onRequestClose={this._handleSnackbarClose}
                />
                <Paper className={styles.box} zDepth={2}>
                    <form onSubmit={this._handleLoginSubmit}>
                        <div>
                            <TextField
                                hintText="Username"
                                floatingLabelText="Username"
                                fullWidth={true}
                                onChange={(e) => this._handleChange('username', e)}
                                value={username}
                            />
                        </div>
                        <div>
                            <TextField
                                hintText="Password"
                                floatingLabelText="Password"
                                fullWidth={true}
                                type="password"
                                onChange={(e) => this._handleChange('password', e)}
                                value={password}
                            />
                        </div>
                        <div>
                            <RaisedButton
                                label="Login"
                                className={styles.button}
                                primary={true}
                                onClick={this._handleLoginSubmit}
                            />
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}
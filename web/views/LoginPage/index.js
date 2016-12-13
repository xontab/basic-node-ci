import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../../layout/styles.scss';
import styles from './styles.scss';

export default class LoginPage extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            username: '',
            password: '',
        };
    }

    _handleChange(field, e) {
        this.setState({
            [field]: e.target.value,
        });
    }

    _handleLoginClick = () => {
        alert("WIP");
    }
    
    render() {
        const { username, password } = this.state;

        return (
            <div className={styles.loginBox}>
                <h1>Basic Node CI</h1>
                <Paper className={styles.box} zDepth={2}>
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
                            onClick={this._handleLoginClick}
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}
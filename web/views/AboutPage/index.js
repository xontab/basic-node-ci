import React, { Component } from 'react';

import globalStyles from '../../layout/styles.scss';

export default class AboutPage extends Component {
    render() {
        return (
            <div>
                <h1 className={globalStyles.title}>About</h1>
                <p>Created by <a href="http://xontab.com/" target="_blank">Shaun Tabone</a> using the following Technologies:</p>
                <ul>
                    <li>Node.JS</li>
                    <li>React</li>
                    <li>Babel</li>
                    <li>Webpack</li>
                    <li>Material UI</li>
                </ul>
            </div>
        );
    }
}
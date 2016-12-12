import React, { Component } from 'react';

import globalStyles from '../../layout/styles.scss';

export default class AboutPage extends Component {
    render() {
        return (
            <div>
                <h1 className={globalStyles.title}>About</h1>
                <div className={globalStyles.well}>
                    <h2 className={globalStyles.simple}>Coming soon.  WIP</h2>
                </div>
            </div>
        );
    }
}
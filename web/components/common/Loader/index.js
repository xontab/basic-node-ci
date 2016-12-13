import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';

import styles from './styles.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={styles.loading}>
        <CircularProgress size={60} thickness={5} />
      </div>
    );
  }
}

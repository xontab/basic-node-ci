import React, { Component } from 'react';

import styles from './styles.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={styles.loading}>
        LOADING...
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import Header from '../components/common/Header';

import styles from './styles.scss';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.headerItems = [
      {
        to: 'about',
        text: 'About',
      },
      {
        to: 'logout',
        text: 'Logout',
      },
    ];
  }

  render() {
    return (
      <div>
        <Header links={this.headerItems} />
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

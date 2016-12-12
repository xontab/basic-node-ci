import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import layoutStyles from '../../../layout/styles.scss';
import styles from './styles.scss';

export default class Header extends Component {
  static propTypes = {
    links: PropTypes.array,
  };

  _renderLinks(links) {
    return (
      links.map((x, i) =>
        <span key={i}>
          |
          <Link to={x.to} activeClassName={styles.active} className={styles.link}>
            {x.text}
          </Link>
        </span>)
    );
  }

  render() {
    const { links } = this.props;

    return (
      <nav>
        <div className={layoutStyles.content}>
          <IndexLink to="/" activeClassName={styles.active} className={styles.link}>Dashboard</IndexLink>
          { links && this._renderLinks(links) }
        </div>
      </nav>
    );
  }
}

import React, {Component} from 'react';
import styles from './Drawer.module.css';
import Backdrop from '../../Backdrop/Backdrop';

const links = [
  1,2,3,4,5,6,7
];

export default class Drawer extends Component {
  
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href="1">Link {link}</a>
        </li>
      )
    });
  }

  render() {
    const classes = [styles.Drawer];

    if (!this.props.isOpen) {
      classes.push(styles.close);
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
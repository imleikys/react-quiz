import React, {Component} from 'react';
import styles from './Drawer.module.css';
import Backdrop from '../../Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

const links = [
  {to: '/', label: 'Список', exact: true}, 
  {to: '/auth', label: 'Авторизация', exact: false}, 
  {to: '/quiz-creator', label: 'Создать тест', exact: false}, 
];

export default class Drawer extends Component {

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={styles.active}
            onClick={this.props.onClose}
          >
            
            {link.label}
          </NavLink>
          
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
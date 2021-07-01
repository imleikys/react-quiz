import React, {Component} from 'react';
import styles from './Drawer.module.css';
import Backdrop from '../../Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';


export default class Drawer extends Component {

  renderLinks(links) {
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

    const links = [
      {to: '/', label: 'Список', exact: true}, 
    ];

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
      links.push({to: '/logout', label: 'Выйти', exact: false});
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false}, )
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
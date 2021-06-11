import React from 'react';
import styles from './MenuToggle.module.css';

const MenuToggle = (props) => {

  const classes = [
    styles.MenuToggle, 
    'fa',
    props.isOpen ? 'fa-times ' + styles.open : 'fa-bars',

  ]

  return (
    <i className={classes.join(' ')} onClick={props.onToggle}>

    </i>
  );
}

export default MenuToggle;

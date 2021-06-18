import React from 'react';
import styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


export default class Auth extends React.Component {

  loginHandler = (props) => {

  }

  registrationHandler = (props) => {

  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  render() {
    return(
      <div className={styles.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form className={styles.AuthForm} onSubmit={this.submitHandler}>
            <Input 
              label={"Email"}
            />
            <Input 
              label={"Password"}
              errorMessage={'test'}
            />

            <Button type="correct" onClick={this.loginHandler}>Войти</Button>
            <Button type="primary" onClick={this.registrationHandler}>Зарегистрироваться</Button>

          </form>
        </div>
      </div>
    );
  }
}

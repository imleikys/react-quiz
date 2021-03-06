import React from 'react';
import styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import {connect} from 'react-redux';
import {auth} from '../../redux/actions/auth';


class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        isTouched: false,
        validation: {
          required :true,
          email: true,
        },
      },

      password: {
        value: '',
        type: 'password',
        label: 'password',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        isTouched: false,
        validation: {
          required :true,
          minLength: 6,
        },
      },
    }
  }

  loginHandler = () => {

    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true,
    )    
  }

  registrationHandler = () => {

    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false,
    )
  }

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
       isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]}

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls, isFormValid
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return(
      <div className={styles.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form className={styles.AuthForm} onSubmit={this.submitHandler}>
            
            {this.renderInputs()}

            <Button 
              type="correct" 
              onClick={this.loginHandler} 
              disabled={!this.state.isFormValid}>
                Войти
            </Button>
            <Button 
              type="primary" 
              onClick={this.registrationHandler} 
              disabled={!this.state.isFormValid}>
                Зарегистрироваться
            </Button>

          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
  }
}

export default connect(null, mapDispatchToProps)(Auth);

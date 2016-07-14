import React from 'react';
import RegisterForm from './RegisterForm';

export default class extends React.Component {
    render() {
      return (
        <div class="row">
            <h4>You can customize your own image too and it is totally free!!! </h4>
            <h3 class="center">Join Now</h3>
            <div class="row">
              <a href="#" class="btn btn-default btn-block">Connect with Facebook</a>
              <a href="#" class="btn btn-primary btn-block">Login with Twitter</a>
              <a href="#" class="btn btn-danger btn-block">Login with Gmail</a>
            </div>
            <div class="row">
            <h3>Register</h3>
                <RegisterForm />
            </div>
        </div>
    );
    }
}

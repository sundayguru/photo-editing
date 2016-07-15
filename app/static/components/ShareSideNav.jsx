import React from 'react';
import RegisterForm from './forms/RegisterForm';
import SocialButtons from './SocialButtons';

export default class extends React.Component {
    render() {
      return (
        <div class="row">
            <h4>You can customize your own image too and it is totally free!!! </h4>
            <h3 class="center">Join Now</h3>
            <SocialButtons type="btn-block" />
            <div class="row">
            <h3>Register</h3>
                <RegisterForm />
            </div>
        </div>
    );
    }
}

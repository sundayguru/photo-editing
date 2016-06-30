import React from 'react';
import BackgroundSlider from '../BackgroundSlider';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

export default class extends React.Component {
    constructor() {
      super();

    }

    render() {
        return (
         <div>
            <BackgroundSlider />

            <section class="row center">
                <div class="login">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#login" data-toggle="tab" aria-expanded="true">Login </a></li>
                                <li class=""><a href="#signup" data-toggle="tab" aria-expanded="false">Register</a></li>
                            </ul>

                            <div id="myTabContent" class="tab-content">
                                <div class="tab-pane fade active in" id="login">
                                    <LoginForm />
                                </div>

                                <div class="tab-pane fade  in" id="signup">
                                    <RegisterForm />
                                </div>
                            </div>

                            <div class="row">
                              <a href="#" class="btn btn-default">Connect with Facebook</a>
                              <a href="#" class="btn btn-primary">Login with Twitter</a>
                              <a href="#" class="btn btn-danger">Login with Gmail</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         </div>
        );
    }
}

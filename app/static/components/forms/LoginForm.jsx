import React from 'react';
import Loader from 'react-loader';
import * as action from '../actions/GenericAction';
import * as Toast from '../actions/ToastAction';
import loginStore from '../store/LoginStore';

export default class extends React.Component {
    constructor() {
      super();
      this.loginComplete = this.loginComplete.bind(this);
    }

    componentWillMount(){
        this.state = {loaded:true};
        loginStore.on('loginComplete', this.loginComplete);
    }

    componentWillUnmount(){
      loginStore.removeListener('loginComplete', this.loginComplete);
    }

    loginComplete(data){
      this.setState({loaded:true});
      if(!data.data.login){
        Toast.error(data.data.message);
      }else{
        Toast.ok('Login Successful');
        document.location.href = '/';
      }
    }

    onSubmit(e) {
        e.preventDefault();
        var dataArray = $(e.target).serializeArray();
        var form = new FormData();
        dataArray.forEach(function(data){
            form.append(data.name, data.value);
        });
        this.setState({loaded:false});
        action.perform(form, 'LOGIN');
    }

    render() {
        const {label} = this.props;
        return (
          <form class="form-horizontal" method="post" onSubmit={this.onSubmit.bind(this)}>
            <Loader loaded={this.state.loaded} top="50%" />
            <fieldset>
                <div class="form-group">
                    <label class="col-lg-2 control-label" style={{display: label ? "block" : 'none'}}>Username</label>
                    <div class="col-lg-12">
                        <input type="text" class="form-control" placeholder="Username" name="username" required />
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-lg-2 control-label" style={{display: label ? "block" : 'none'}}>Password</label>
                    <div class="col-lg-12">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" required />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-10 col-lg-offset-2">
                        <button type="submit" class="btn btn-primary right" disabled={ !this.state.loaded } > <i class="mdi mdi-login-variant"></i> Login</button>
                    </div>
                </div>
            </fieldset>
          </form>
        );
    }
}

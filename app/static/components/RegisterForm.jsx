import React from 'react';
import Loader from 'react-loader';
import registerStore from './store/RegisterStore';
import * as registerActions from './actions/RegisterAction';
import * as Toast from './actions/ToastAction';

export default class extends React.Component {
    constructor() {
      super();
      this.state = {loaded:true};
    }

    componentWillMount(){
      registerStore.on('registerComplete', this.registerComplete.bind(this));
    }

    componentWillUnmount(){
      registerStore.removeListener('registerComplete', this.registerComplete.bind(this));
    }

    registerComplete(data){
      this.setState({loaded:true});
      if(data.status != 201){
        Toast.error(data.data.username[0]);
      }else{
        Toast.ok('Account created');
      }
    }

    onSubmit(e) {
      e.preventDefault();
      var dataArray = $(e.target).serializeArray();
      var dataObject = {};
      dataArray.forEach(function(data){
        dataObject[data.name] = data.value;
      });
      if(dataObject.password != dataObject.confirm_password){
        Toast.error('Password Mismatch');
        return false;
      }
      this.setState({loaded:false});
      registerActions.register(dataObject);
    }

    render() {
        return (
          <form class="form-horizontal" method="post" onSubmit={this.onSubmit.bind(this)}>

              <fieldset>
                  <Loader loaded={this.state.loaded} top="73%" />
                  <div class="form-group">
                      <label for="username" class="col-lg-2 control-label">Username</label>
                      <div class="col-lg-10">
                          <input type="text" class="form-control" id="username" placeholder="Username" name="username" required />
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="email" class="col-lg-2 control-label">Email</label>
                      <div class="col-lg-10">
                          <input type="email" class="form-control" id="email" name="email" placeholder="Email" required />
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="password" class="col-lg-2 control-label">Password</label>
                      <div class="col-lg-10">
                          <input type="password" class="form-control" id="password" name="password" placeholder="Password" required />
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="confirm_password" class="col-lg-2 control-label">Confirm Password</label>
                      <div class="col-lg-10">
                          <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required />
                      </div>
                  </div>
                  <div class="form-group">
                      <div class="col-lg-10 col-lg-offset-2">
                          <button type="submit" class="btn btn-primary right" disabled={!this.state.loaded} >Register</button>
                      </div>
                  </div>
              </fieldset>
          </form>
        );
    }
}
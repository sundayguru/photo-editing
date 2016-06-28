import React from 'react';
import Nav from '../Nav';

export default class extends React.Component {
    constructor() {
      super();

    }
    componentDidMount(){

    }

    render() {
      var index = $('#index').val();
      if(document.location.href.indexOf('dashboard') > 0){
          if(index == 'Login'){
              document.location.href = '/';
              return;
          }
      }else{
          if(index == 'dashboard'){
              document.location.href = '#/dashboard';
              return;
          }
      }

        return (
        <div class="row">
          <Nav />
          <div class="container">
             {this.props.children}
          </div>
        </div>
        );
    }
}

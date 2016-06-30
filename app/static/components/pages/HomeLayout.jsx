import React from 'react';
import Nav from '../Nav';
import Notifications from 'react-notify-toast';

export default class extends React.Component {
    constructor() {
      super();
      var index = $('#index').val();
      this.state = {active: true ? index == 'Dashboard' : false}
    }

    render() {
        return (
        <div class="row">
        <Notifications />
          <Nav user_active_class={'hide'} />
          <div class="container">
             {this.props.children}
          </div>
        </div>
        );
    }
}

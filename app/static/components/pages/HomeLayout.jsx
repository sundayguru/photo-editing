import React from 'react';
import Nav from '../Nav';
import Notifications from 'react-notify-toast';

export default class extends React.Component {
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

import React from 'react';
import Nav from '../Nav';
import Notifications from 'react-notify-toast';

export default class extends React.Component {
    constructor() {
      super();

    }
    componentDidMount(){

    }

    render() {
        return (
        <div class="row">
        <Notifications />
          <Nav />
          <div class="container">
             {this.props.children}
          </div>
        </div>
        );
    }
}

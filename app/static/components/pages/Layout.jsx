import React from 'react';
import Nav from '../Nav';

export default class extends React.Component {
    constructor() {
      super();

    }
    componentDidMount(){

    }

    render() {
        return (
        <div class="row">

          <Nav />
          <div class="container">
          <Notifications />
             {this.props.children}
          </div>
        </div>
        );
    }
}
